import { useState, useEffect, useRef } from 'react';
import { Header } from '../components/layout/Header';
import { 
  Send, User, Hash, Search, Bell, Plus, Code, AlertTriangle, Shield
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import api from '../lib/api';

// --- MARKDOWN IMPORTS ---
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const chatEndRef = useRef(null);

  const [activeChannel, setActiveChannel] = useState('general-ops');

  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  // 1. Load User & Fetch Posts on Mount and Channel Change
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(storedUser);
    fetchPosts(activeChannel);
  }, [activeChannel]);

  // 2. Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [posts]);

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${import.meta.env.VITE_API_URL}${url}`;
  };

  const fetchPosts = async (channel) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/posts?channel=${channel}`);
      // Reverse array to show newest at the bottom (Chat style)
      setPosts(response.data.reverse()); 
    } catch (error) {
      console.error("Failed to load posts", error);
      toast({ title: "Error", description: "Failed to load community messages.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() && !imageFile) return;

    if (!currentUser) {
      toast({ title: "Login Required", description: "You must be logged in to post.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('content', newPost);
      formData.append('channel', activeChannel);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      // Important: api is axios. Using FormData automatically sets multipart/form-data headers
      const response = await api.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setPosts([...posts, response.data]); // Add new post to bottom
      setNewPost(""); 
      setImageFile(null);


      
    } catch (error) {
      console.error("Post error:", error);
      toast({ title: "Error", description: "Could not share post.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
    
    if (isToday) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Markdown Custom Renderer
  const renderers = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          className="rounded-md text-sm my-2 shadow-sm border border-gray-700"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-100 text-red-500 rounded px-1 py-0.5 text-sm font-mono" {...props}>
          {children}
        </code>
      )
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden font-sans">
      <Header />
      
      {/* Main Layout */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-slate-50 border-r border-gray-200 flex flex-col hidden md:flex">
          <div className="h-14 border-b border-gray-200 flex items-center px-4 font-bold text-gray-800 shadow-sm bg-white">
            <Shield className="w-5 h-5 mr-2 text-[#1e90ff]" /> CyberConnect Ops
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin text-sm">
             <div className="mt-2 px-2 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center justify-between">
               <span>Active Channels</span>
             </div>
             
            <div 
              onClick={() => setActiveChannel('general-ops')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer font-medium transition-colors ${activeChannel === 'general-ops' ? 'bg-[#1e90ff]/10 text-[#1e90ff]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Hash className="w-4 h-4" /> <span>general-ops</span>
            </div>
            
            <div 
              onClick={() => setActiveChannel('threat-intel-feed')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer font-medium transition-colors ${activeChannel === 'threat-intel-feed' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <AlertTriangle className={`w-4 h-4 ${activeChannel === 'threat-intel-feed' ? 'text-red-600' : 'text-red-500'}`} /> <span>threat-intel-feed</span>
            </div>
            
             <div 
              onClick={() => setActiveChannel('malware-analysis')}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer font-medium transition-colors ${activeChannel === 'malware-analysis' ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Code className={`w-4 h-4 ${activeChannel === 'malware-analysis' ? 'text-purple-600' : 'text-purple-500'}`} /> <span>malware-analysis</span>
            </div>
          </div>

          {/* Current User Info */}
          {currentUser && (
            <div className="p-3 bg-gray-100/80 border-t border-gray-200 flex items-center gap-3">
               <div className="relative">
                {currentUser.profilePic ? (
                  <img src={getImageUrl(currentUser.profilePic)} className="w-9 h-9 rounded-md object-cover border border-gray-300" alt="User" />
                ) : (
                  <div className="w-9 h-9 bg-gradient-to-br from-[#1e90ff] to-blue-700 rounded-md flex items-center justify-center text-white shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="overflow-hidden leading-tight">
                <div className="text-sm font-bold text-gray-800 truncate">{currentUser.name}</div>
                <div className="text-xs text-gray-500 truncate capitalize">
                  {currentUser.role || 'Member'}
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* --- MAIN CHAT AREA --- */}
        <main className="flex-1 flex flex-col min-w-0 bg-gray-50 relative">
          
          {/* Header */}
          <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 shadow-sm bg-white z-10 shrink-0">
            <div className="flex items-center gap-2">
              <Hash className="w-6 h-6 text-gray-400" />
              <div>
                <h2 className="font-bold text-gray-800 leading-tight">{activeChannel}</h2>
                <p className="text-xs text-gray-500 hidden sm:block">
                  {activeChannel === 'general-ops' && 'Main operations hub and general security discussions.'}
                  {activeChannel === 'threat-intel-feed' && 'Real-time threat reports and intelligence sharing.'}
                  {activeChannel === 'malware-analysis' && 'Deep dives into reverse engineering and malware behaviors.'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-gray-500">
               <div className="bg-gray-100 p-1.5 rounded-md hover:bg-gray-200 cursor-pointer transition-colors"><Search className="w-4 h-4" /></div>
               <div className="bg-gray-100 p-1.5 rounded-md hover:bg-gray-200 cursor-pointer transition-colors relative">
                 <Bell className="w-4 h-4" />
               </div>
            </div>
          </div>

          {/* Mobile Channel Selector */}
          <div className="md:hidden flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide shrink-0 shadow-sm z-10">
             <button onClick={() => setActiveChannel('general-ops')} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors shadow-sm ${activeChannel === 'general-ops' ? 'bg-[#1e90ff] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}># general-ops</button>
             <button onClick={() => setActiveChannel('threat-intel-feed')} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors shadow-sm ${activeChannel === 'threat-intel-feed' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}># threat-intel-feed</button>
             <button onClick={() => setActiveChannel('malware-analysis')} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[13px] font-bold transition-colors shadow-sm ${activeChannel === 'malware-analysis' ? 'bg-purple-50 text-purple-600 border border-purple-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}># malware-analysis</button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 bg-white/50">
              {loading ? (
                <div className="text-center mt-10 text-gray-400 flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1e90ff]"></div> Loading intel...
                </div>
              ) : posts.length === 0 ? (
                 <div className="text-center mt-20 opacity-90 max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
                    <Shield className="w-10 h-10 text-[#1e90ff]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-800 mb-3 tracking-tight">Welcome to the Community!</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    This is a live chat space where you can speak to people, discuss cybersecurity, share threat intelligence, and help each other stay safe online.
                  </p>
                  <p className="text-blue-500 font-semibold text-sm mt-6">
                    Be the first to break the ice — send a message below! 👇
                  </p>
                </div>
              ) : (
                posts.map((post, index) => {
                  const isSequence = index > 0 && posts[index - 1].user?._id === post.user?._id;
                  
                  return (
                    <div key={post._id} className={`flex gap-4 group ${isSequence ? 'mt-0.5' : 'mt-6'} px-2 hover:bg-gray-50 rounded-lg py-1 transition-all`}>
                      {/* Avatar */}
                      <div className="w-10 flex-shrink-0 pt-1">
                        {!isSequence ? (
                          post.user?.profilePic ? (
                            <img 
                              src={getImageUrl(post.user.profilePic)} 
                              alt={post.user.name} 
                              className="w-10 h-10 rounded-md object-cover shadow-sm cursor-pointer" 
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 shadow-sm cursor-pointer hover:ring-2 ring-[#1e90ff]/50 transition-all">
                              <User className="w-6 h-6" />
                            </div>
                          )
                        ) : (
                           <div className="opacity-0 group-hover:opacity-100 text-[10px] text-gray-400 text-right pt-2 whitespace-nowrap transition-opacity duration-200 w-12 -ml-2">
                            {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {!isSequence && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-[15px] text-gray-900 hover:underline cursor-pointer">
                              {post.user?.name || "Unknown Agent"}
                            </span>
                            
                            {/* ROLE BADGES */}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-[4px] font-bold uppercase tracking-wider ${
                               post.user?.role === 'admin' ? 'bg-red-100 text-red-600 border border-red-200' : 
                               post.user?.role === 'expert' ? 'bg-purple-100 text-purple-600 border border-purple-200' : 
                               'bg-gray-100 text-gray-600 border border-gray-200'
                             }`}>
                              {post.user?.role || 'User'}
                            </span>

                            <span className="text-xs text-gray-400 ml-1">{formatDate(post.createdAt)}</span>
                          </div>
                        )}
                        
                        {/* Markdown Content */}
                        <div className={`text-[15px] text-gray-800 leading-relaxed markdown-container ${isSequence ? 'ml-0' : ''}`}>
                          {post.content && (
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={renderers}
                            >
                              {post.content}
                            </ReactMarkdown>
                          )}
                          {post.image && (
                            <div className="mt-3">
                              <img src={getImageUrl(post.image)} alt="Attachment" className="max-w-full md:max-w-md rounded-xl shadow-sm border border-gray-200" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            {currentUser ? (
              <div className="flex flex-col gap-2">
                {/* Image Preview */}
                {imageFile && (
                  <div className="relative inline-block w-24 h-24 mb-2">
                    <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                    <button 
                      onClick={() => setImageFile(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                    >
                      <Plus className="w-3 h-3 transform rotate-45" />
                    </button>
                  </div>
                )}
                
                <form onSubmit={handlePostSubmit} className="relative bg-gray-100 rounded-xl flex items-center p-2 border border-gray-200 focus-within:border-[#1e90ff] focus-within:ring-2 focus-within:ring-[#1e90ff]/20 transition-all">
                  
                  <div className="flex items-center pl-2 pr-1">
                      <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileInputRef}
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setImageFile(e.target.files[0]);
                          }
                        }}
                      />
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors w-fit"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                  </div>

                  <textarea
                    rows={1}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 resize-none py-2 px-3 scrollbar-thin"
                    placeholder={`Message #${activeChannel}`}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handlePostSubmit(e);
                      }
                    }}
                  />

                  <div className="pr-1">
                      <button 
                        type="submit" 
                        disabled={submitting || (!newPost.trim() && !imageFile)} 
                        className={`p-2 rounded-lg transition-all ${(newPost.trim() || imageFile) ? 'bg-[#1e90ff] text-white hover:bg-blue-600 hover:scale-105' : 'bg-gray-200 text-gray-400'}`}
                      >
                        <Send className="w-4 h-4 transform rotate-45 relative left-[-1px]" />
                      </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm py-3 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                Access restricted. <a href="/login" className="text-[#1e90ff] font-medium hover:underline">Authenticate</a> to contribute intelligence.
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Community;