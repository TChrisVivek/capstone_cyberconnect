const Post = require("../models/Post");

// 1. Get all Posts
exports.getAllPosts = async (req, res) => {
  try {
    // Sort by newest first (-1)
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// 2. Create a new Post
exports.createPost = async (req, res) => {
  try {
    const { title, content, user_id, authorName } = req.body;

    if (!title || !content || !user_id) {
      return res.status(400).json({ error: "Title, Content, and User are required." });
    }

    const newPost = new Post({
      title,
      content,
      user_id,
      authorName
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);

  } catch (error) {
    console.error("🔥 [BACKEND] Create Post Error:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// 3. Add a Comment to a Post
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text, user_id, authorName } = req.body;

    if (!text || !user_id) {
      return res.status(400).json({ error: "Comment text and user are required." });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = {
      text,
      user_id,
      authorName: authorName || "Anonymous"
    };

    // Add comment to the beginning of the array so newest shows first
    post.comments.unshift(newComment); 

    await post.save();
    
    // Return the updated post so the frontend can display the new comment immediately
    res.status(201).json(post); 

  } catch (error) {
    console.error("🔥 [BACKEND] Add Comment Error:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};