const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware'); // ✅ Import Security Middleware

// Import Controller Functions
const { 
  registerUser, 
  loginUser, 
  googleLogin, 
  getMe, 
  updateUserProfile 
} = require('../controllers/userController');

// --- MULTER CONFIGURATION (For Profile Pics) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to backend/uploads
  },
  filename: (req, file, cb) => {
    // Unique name: timestamp + extension
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage: storage });

// --- ROUTES ---

// Public Routes (No Token Needed)
router.post('/', registerUser); // Register a new user
router.post('/login', loginUser);
router.post('/google-login', googleLogin);

// Protected Routes (Token Required)
// 1. Get My Profile (Uses token to identify user, safer than /:id)
router.get('/me', protect, getMe);

// 2. Update Profile (Protected + File Upload)
router.put('/:id', protect, upload.single('profilePic'), updateUserProfile);

module.exports = router;