const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware'); // ✅ Import Security Middleware

// Import Controller Functions
const { 
  createPost, 
  getAllPosts, 
  deletePost 
} = require('../controllers/postController');

// --- MULTER CONFIGURATION (For Post Attachments) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to backend/uploads
  },
  filename: (req, file, cb) => {
    cb(null, 'post-' + Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage: storage });

// --- ROUTES ---

// 1. Get All Posts (Public - Everyone can see the feed)
// GET /api/posts
router.get('/', getAllPosts);

// 2. Create a Post (Protected - Must be logged in)
// POST /api/posts
router.post('/', protect, upload.single('image'), createPost);

// 3. Delete a Post (Protected - Owner or Admin)
// DELETE /api/posts/:id
router.delete('/:id', protect, deletePost);

module.exports = router;