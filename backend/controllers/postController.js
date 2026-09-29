const Post = require('../models/Post');
const { logAction } = require('./actionLogController'); // ✅ Import Logger

// 1. Create a new Post
exports.createPost = async (req, res) => {
  try {
    const { content, channel } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Validation
    if (!content && !imagePath) {
      return res.status(400).json({ error: "Content or image is required" });
    }

    // Create Post
    const newPost = new Post({
      user: req.user.id, 
      content: content || '',
      channel: channel || 'general-ops',
      image: imagePath
    });

    await newPost.save();

    // 📝 LOG ACTION
    await logAction(req.user.id, "Community Post", `Shared a new post in ${channel || 'general-ops'}`);

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
    // If a channel is provided in query, filter by it. Default to general-ops if undefined in DB.
    const query = req.query.channel ? { $or: [{ channel: req.query.channel }] } : {};
    if (req.query.channel === 'general-ops') {
      query.$or.push({ channel: { $exists: false } }); // Legacy posts
    }
    
    const posts = await Post.find(query)
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