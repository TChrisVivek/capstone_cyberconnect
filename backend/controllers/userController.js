const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios'); // ✅ Axios for Google Auth
const { logAction } = require('./actionLogController'); // ✅ Logger

// Helper: Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please add all fields" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user' // Default role
    });

    if (user) {
      // 📝 LOG ACTION
      await logAction(user._id, "User Registered", "Account created successfully");

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// 2. Login User
exports.loginUser = async (req, res) => {
  try {
    console.log("LOGIN BODY 👉", req.body); // 🔥 ADD THIS

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      await logAction(user._id, "User Logged In", "Login successful");

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// 3. Google Login (Secure via Axios)
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    
    // ✅ Verify token with Google using Axios
    const googleResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    
    const { email, name, sub, picture } = googleResponse.data;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if they don't exist
      const randomPassword = Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
        googleId: sub,
        profilePic: picture
      });

      // 📝 LOG ACTION
      await logAction(user._id, "User Registered (Google)", "Account created via Google");
    } else {
      // 📝 LOG ACTION
      await logAction(user._id, "User Logged In (Google)", "Login successful via Google");
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      token: generateToken(user.id),
    });

  } catch (error) {
    console.error("Google Auth Error:", error.message);
    res.status(400).json({ error: "Google authentication failed" });
  }
};

// 4. Get Current User Profile (Protected Route)
exports.getMe = async (req, res) => {
  try {
    // req.user is set by the auth middleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Use req.user.id from token if available, or params if you prefer
    // Using params here to match your old code structure
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      // ✅ If password is provided, HASH IT before saving
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      // ✅ Handle File Upload
      if (req.file) {
        user.profilePic = `/uploads/${req.file.filename}`;
      }

      const updatedUser = await user.save();

      // 📝 LOG ACTION
      await logAction(updatedUser._id, "Profile Updated", "User updated profile details");

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic,
        token: generateToken(updatedUser._id) // Return new token in case info changed
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Update failed: " + error.message });
  }
};