import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { MessageCircle, User, Clock, Send, MessageSquare } from 'lucide-react';
import api from '../lib/api'; 
import { useToast } from '../hooks/use-toast';

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // State for Create Post Form
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  // State for Comments (Tracks which post's comments are open)
  const [openComments, setOpenComments] = useState({}); 
  const [replyText, setReplyText] = useState({}); // Stores text for each post's reply input

  // 1. Fetch Posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Create Post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast({ title: "Access Denied", description: "You must be logged in to post.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/posts', {
        title: newPost.title,
        content: newPost.content,
        user_id: user._id || user.id,
        authorName: user.name || "Anonymous User"
      });
      
      toast({ title: "Success", description: "Your post has been published!" });
      setNewPost({ title: '', content: '' }); 
      fetchPosts(); 
    } catch (error) {
      toast({ title: "Error", description: "Failed to create post.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Toggle Comment Section
  const toggleComments = (postId) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  // 4. Submit Comment
  const handleAddComment = async (postId) => {
    const text = replyText[postId];
    if (!text?.trim()) return;

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast({ title: "Access Denied", description: "Login to reply.", variant: "destructive" });
      return;
    }

    try {
      await api.post(`/posts/${postId}/comments`, {
        text: text,
        user_id: user._id || user.id,
        authorName: user.name || "Anonymous"
      });

      toast({ title: "Reply Added" });
      setReplyText(prev => ({ ...prev, [postId]: '' })); // Clear input
      fetchPosts(); // Refresh to see new comment
    } catch (error) {
      toast({ title: "Error", description: "Failed to add reply.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-24 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Forum</h1>
          <p className="text-gray-500 text-lg">Join the conversation. Ask questions, share tips, and reply to others.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Create Post Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#1e90ff]" />
                Start a Discussion
              </h3>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <input 
                  type="text" required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1e90ff] text-sm"
                  placeholder="Topic Title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                />
                <textarea 
                  required rows="4"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1e90ff] text-sm"
                  placeholder="Share your thoughts..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                ></textarea>
                <Button type="submit" disabled={submitting} className="w-full bg-[#1e90ff] hover:bg-[#1e90ff]/90 text-white">
                  {submitting ? 'Posting...' : 'Post Discussion'} <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>

          {/* Posts List Column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-gray-700">Recent Discussions</h3>
            
            {loading ? <p className="text-gray-500">Loading...</p> : posts.map((post) => (
              <div key={post._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                
                {/* Post Content */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.content}</p>
                
                {/* Metadata & Actions */}
                <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 font-medium text-gray-600"><User className="w-4 h-4" /> {post.authorName}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Toggle Comments Button */}
                  <button 
                    onClick={() => toggleComments(post._id)}
                    className="flex items-center gap-1.5 text-[#1e90ff] hover:text-[#1e90ff]/80 font-medium transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {post.comments?.length || 0} Comments
                  </button>
                </div>

                {/* --- COMMENT SECTION (Collapsible) --- */}
                {openComments[post._id] && (
                  <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in bg-gray-50/50 -mx-6 px-6 pb-2">
                    
                    {/* List Existing Comments */}
                    <div className="space-y-4 mb-4">
                      {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment, index) => (
                          <div key={index} className="bg-white p-3 rounded-lg border border-gray-100 text-sm">
                            <div className="flex justify-between mb-1">
                              <span className="font-semibold text-gray-800">{comment.authorName}</span>
                              <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-600">{comment.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400 italic">No comments yet. Be the first to reply!</p>
                      )}
                    </div>

                    {/* Add Reply Input */}
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Write a reply..." 
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1e90ff]"
                        value={replyText[post._id] || ''}
                        onChange={(e) => setReplyText(prev => ({ ...prev, [post._id]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post._id)}
                      />
                      <Button 
                        size="sm" 
                        onClick={() => handleAddComment(post._id)}
                        className="bg-[#1e90ff] text-white hover:bg-[#1e90ff]/90"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                )}
                {/* --- END COMMENT SECTION --- */}

              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;