const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// POST /api/posts/:userId -> Create Post
router.post('/:userId', postController.createPost);

// GET /api/posts -> Get All Posts
router.get('/', postController.getAllPosts);

module.exports = router;