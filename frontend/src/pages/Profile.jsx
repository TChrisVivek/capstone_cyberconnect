import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { User, Shield, Save, Camera, LogOut } from 'lucide-react';
import api from '../lib/api';
import { useToast } from '../hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: null
  });

  // 1. Fetch User Data (Updated to use /me)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      // ✅ No need to pass ID. The token handles it.
      fetchUserProfile(); 
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      // ✅ FIXED: Use the secure '/me' endpoint
      const response = await api.get('/users/me');
      
      setUser(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        password: '',
        profilePic: null
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast({ 
        title: "Error", 
        description: "Failed to load profile data.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    toast({ title: "Logged Out", description: "See you next time!" });
  };

  // 3. Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // 4. Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      // We still use ID for the update route as defined in backend
      // But we get it securely from the fetched user object
      const userId = user._id; 

      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      if (formData.password) data.append('password', formData.password);
      if (formData.profilePic) data.append('profilePic', formData.profilePic);

      const response = await api.put(`/users/${userId}`, data);
      
      // Update State & Local Storage
      setUser(response.data);
      
      // Merge new data with existing token in localStorage so we don't lose the session
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updatedUserSession = { ...currentUser, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUserSession));
      
      toast({ title: "Profile Updated", description: "Your changes have been saved." });
      setFormData(prev => ({ ...prev, password: '' })); 

    } catch (error) {
      console.error("Update Error:", error);
      toast({ 
        title: "Update Failed", 
        description: error.response?.data?.error || "Could not save changes.", 
        variant: "destructive" 
      });
    } finally {
      setUpdating(false);
    }
  };

  const getProfileImage = () => {
    if (preview) return preview;
    if (user?.profilePic) return `http://localhost:5000${user.profilePic}`;
    return null;
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-24 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* --- HEADER SECTION --- */}
          <div className="bg-[#1e90ff]/10 p-8 flex flex-col items-center">
            
            {/* Avatar Circle */}
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 relative overflow-hidden border-4 border-white">
              {getProfileImage() ? (
                <img 
                  src={getProfileImage()} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <User className="w-12 h-12 text-[#1e90ff]" />
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              <button 
                type="button" 
                onClick={() => fileInputRef.current.click()} 
                className="absolute bottom-0 right-0 left-0 bg-black/50 text-white p-1 flex justify-center hover:bg-black/70 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-500 capitalize">{user?.role || "Member"}</p>
          </div>

          {/* --- FORM SECTION --- */}
          <div className="p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#1e90ff]" /> Account Details
            </h2>

            <form onSubmit={handleUpdate} className="space-y-6 max-w-lg mx-auto">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1e90ff]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1e90ff]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password (Optional)</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1e90ff]"
                />
              </div>

              <div className="pt-4 space-y-3">
                {/* Save Button */}
                <Button type="submit" disabled={updating} className="w-full bg-[#1e90ff] text-white hover:bg-[#1e90ff]/90">
                  {updating ? 'Saving...' : 'Save Changes'} <Save className="w-4 h-4 ml-2" />
                </Button>

                {/* Logout Button */}
                <button 
                  type="button" 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium border border-red-100"
                >
                  Log Out <LogOut className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;