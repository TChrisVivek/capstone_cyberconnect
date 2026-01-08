const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// GET /api/posts - Read all posts
router.get("/", postController.getAllPosts);

// POST /api/posts - Create a new post
router.post("/", postController.createPost);

// POST /api/posts/:postId/comments - Add a comment (Reply)
router.post("/:postId/comments", postController.addComment); 

module.exports = router;