const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

// --- MULTER CONFIGURATION ---
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
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserProfile);
router.post('/google-login', userController.googleLogin);

// ✅ UPDATE ROUTE: Uses 'upload.single' middleware
router.put('/:id', upload.single('profilePic'), userController.updateUserProfile);

module.exports = router;