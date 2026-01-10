const Post = require('../models/Post');
const { logAction } = require('./actionLogController'); // ✅ Import Logger

// 1. Create a new Post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;

    // Validation
    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Create Post
    // Note: We use req.user.id (from the token) instead of req.params.userId for security.
    const newPost = new Post({
      user: req.user.id, 
      content
    });

    await newPost.save();

    // 📝 LOG ACTION
    await logAction(req.user.id, "Community Post", "Shared a new post in the community");

    // Return the post with user details immediately so the UI updates nicely
    const populatedPost = await Post.findById(newPost._id).populate('user', 'name profilePic role');

    res.status(201).json(populatedPost);

  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// 2. Get All Posts (Sorted by Newest)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name profilePic role') 
      .sort({ createdAt: -1 }); // Newest first

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Delete a Post (Owner or Admin only)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check ownership: Only the author OR an 'admin' can delete
    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ error: 'Not authorized to delete this post' });
    }

    await post.deleteOne();

    // 📝 LOG ACTION
    await logAction(req.user.id, "Post Deleted", "Removed a post from community");

    res.json({ id: req.params.id, message: "Post removed" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};