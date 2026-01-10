const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ Import Security Middleware

// Import Controller Functions
const { 
  createPost, 
  getAllPosts, 
  deletePost 
} = require('../controllers/postController');

// --- ROUTES ---

// 1. Get All Posts (Public - Everyone can see the feed)
// GET /api/posts
router.get('/', getAllPosts);

// 2. Create a Post (Protected - Must be logged in)
// POST /api/posts
router.post('/', protect, createPost);

// 3. Delete a Post (Protected - Owner or Admin)
// DELETE /api/posts/:id
router.delete('/:id', protect, deletePost);

module.exports = router;