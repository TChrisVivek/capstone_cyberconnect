import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // ✅ Removed useNavigate (no longer needed for logout here)
import { Button } from '../ui/Button';
import {
  Shield,
  Menu,
  X,
  User,
  MessageCircle,
  AlertCircle,
  Home,
  Info,
  Lock,
  LayoutDashboard,
  AlertTriangle 
} from 'lucide-react'; // ✅ Removed LogOut icon

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // 1. Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Check Login Status & Load User Data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname]); // Update whenever we change pages

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Threats', path: '/threats', icon: AlertTriangle },
    { name: 'Community', path: '/community', icon: MessageCircle },
    { name: 'Report Issue', path: '/report-issue', icon: AlertCircle },
  ];

  // Helper to get image URL
  const getProfileImage = () => {
    if (user?.profilePic) {
      return `http://localhost:5000${user.profilePic}`;
    }
    return null;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-3 ${
        isScrolled ? "bg-white backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80">
          <Shield className="w-8 h-8 text-[#1e90ff]" />
          <span className="text-xl font-semibold tracking-tight">Cyber Connect</span>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium link-underline transition-colors ${
                location.pathname === item.path ? "text-[#1e90ff]" : "text-[#383e47]/80 hover:text-[#383e47]"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {user && (
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/dashboard' ? "text-[#1e90ff]" : "text-[#383e47]/80 hover:text-[#383e47]"
              }`}
            >
              Dashboard
            </Link>
          )}

          <Link
            to="/about"
            className={`text-sm font-medium link-underline transition-colors ${
              location.pathname === '/about' ? "text-[#1e90ff]" : "text-[#383e47]/80 hover:text-[#383e47]"
            }`}
          >
            About
          </Link>
        </nav>

        {/* --- AUTH BUTTONS --- */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {/* Show Avatar/Profile Link ONLY */}
              <Link to="/profile" className="flex items-center gap-2">
                {getProfileImage() ? (
                   <img 
                     src={getProfileImage()} 
                     alt="Profile" 
                     className="w-9 h-9 rounded-full object-cover border border-gray-200 hover:border-[#1e90ff] transition-colors"
                   />
                ) : (
                  <Button variant="ghost" size="sm" className="gap-1.5 text-gray-600 hover:text-[#1e90ff]">
                    <User className="w-4 h-4" /> Profile
                  </Button>
                )}
              </Link>
              {/* ❌ Removed Logout Button Here */}
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-1.5"><Lock className="w-4 h-4" /> Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm" className="gap-1.5 bg-[#1e90ff] text-white"><User className="w-4 h-4" /> Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* --- MOBILE MENU CONTENT --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-6 flex flex-col gap-4 border-t border-gray-100">
          
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <item.icon className="w-5 h-5 text-gray-500" /> {item.name}
            </Link>
          ))}
          
          {user && (
            <Link to="/dashboard" className="flex items-center gap-3 p-3 text-[#1e90ff] bg-blue-50 rounded-lg">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
          )}

          <Link to="/about" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
             <Info className="w-5 h-5 text-gray-500" /> About
          </Link>

          <hr className="my-2 border-gray-100" />

          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                 {getProfileImage() ? (
                    <img src={getProfileImage()} alt="User" className="w-6 h-6 rounded-full object-cover" />
                 ) : (
                    <User className="w-5 h-5 text-gray-500" /> 
                 )}
                 My Profile
              </Link>
              {/* ❌ Removed Logout Button Here too */}
            </>
          ) : (
             <Link to="/login" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
               <Lock className="w-5 h-5 text-gray-500" /> Login
             </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;