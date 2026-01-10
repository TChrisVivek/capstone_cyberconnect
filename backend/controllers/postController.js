const Post = require('../models/Post');
const { logAction } = require('./actionLogController'); // ✅ Import Logger

// 1. Create a new Post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    
    const newPost = new Post({
      user: req.params.userId,
      content
    });

    await newPost.save();

    // 📝 LOG ACTION
    await logAction(req.params.userId, "Community Post", "Shared a new post in the community");

    // Return the post with user details (populated) so we can show the name immediately
    const populatedPost = await Post.findById(newPost._id).populate('user', 'name profilePic role');

    res.status(201).json(populatedPost);

  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

// 2. Get All Posts (Sorted by Newest)
exports.getAllPosts = async (req, res) => {
  try {
    // .populate('user') fills in the Name and Profile Pic of the author
    const posts = await Post.find()
      .populate('user', 'name profilePic role') 
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};