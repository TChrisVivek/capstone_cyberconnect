const User = require("../models/User");
const { logAction } = require('./actionLogController'); // ✅ Import the logger
const { OAuth2Client } = require('google-auth-library'); // ✅ Import Google Auth

// Initialize Google Client
// ⚠️ REPLACE THIS STRING WITH YOUR ACTUAL GOOGLE CLIENT ID
const client = new OAuth2Client("1023938203236-9irq03kqv1j3v43p86g5uscg9s3cqf40.apps.googleusercontent.com"); 

// 1. Create a new user (Register)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("📝 Registering user:", email);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Create the new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    console.log("✅ User created successfully:", newUser._id);

    // 📝 LOG ACTION: Register
    await logAction(newUser._id, "User Registered", "Account created successfully");

    res.status(201).json(newUser);

  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({ error: error.message }); 
  }
};

// 2. Get all users (Admin or Debugging)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Hide passwords
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// 3. Get User Profile (Matches route /:id)
exports.getUserProfile = async (req, res) => {
  try {
    // We use .select("-password") so we don't send the password to the frontend
    const user = await User.findById(req.params.id).select("-password");
    
    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// 4. Update User Profile (Matches route /:id)
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Update fields if they are sent in the body
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      // Update password only if a new one is provided
      if (req.body.password) {
        user.password = req.body.password; 
      }

      // ✅ Check if a file was uploaded
      if (req.file) {
        user.profilePic = `/uploads/${req.file.filename}`; // Save path
      }

      const updatedUser = await user.save();
      
      // 📝 LOG ACTION: Update
      await logAction(updatedUser._id, "Profile Updated", "User updated their profile details");
      
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic // Return new image URL
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Update failed: " + error.message });
  }
};

// 5. Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if password matches
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 📝 LOG ACTION: Login
    await logAction(user._id, "User Logged In", "Login successful");

    // Return user info (success)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic, // ✅ Send the image path!
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// 6. Google Login (NEW)
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "YOUR_GOOGLE_CLIENT_ID_HERE", // ⚠️ REPLACE THIS
    });
    
    const { name, email, picture } = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user (Generate a random password since they use Google)
      const randomPassword = Math.random().toString(36).slice(-8);
      
      user = new User({
        name,
        email,
        password: randomPassword, 
        role: 'user', // Default role
        profilePic: picture
      });
      await user.save();
      
      // 📝 LOG ACTION
      await logAction(user._id, "User Registered (Google)", "Account created via Google");
    } else {
      // 📝 LOG ACTION
      await logAction(user._id, "User Logged In (Google)", "Login successful via Google");
    }

    // Return user info
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      message: "Google Login successful"
    });

  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ error: "Google authentication failed" });
  }
};