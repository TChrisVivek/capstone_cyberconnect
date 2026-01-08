import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  LogOut,
  Github,
  Twitter,
  Linkedin,
  AlertTriangle // ✅ Added Icon for Threats
} from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Check Login Status
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // 3. Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // 4. Define Links (✅ Added Threats Here)
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Threats', path: '/threats', icon: AlertTriangle }, // ✅ NEW LINK
    { name: 'Community', path: '/community', icon: MessageCircle },
    { name: 'Report Issue', path: '/report-issue', icon: AlertCircle },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-3 ${
        isScrolled ? "bg-white backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80">
          <Shield className="w-8 h-8 text-[#1e90ff]" />
          <span className="text-xl font-semibold tracking-tight">Cyber Connect</span>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden md:flex items-center gap-6">
          
          {/* 1. Render Standard Links */}
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

          {/* 2. Render Dashboard (Only if Logged In) */}
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

          {/* 3. Render About (Always Last) */}
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
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
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
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-6 flex flex-col gap-4">
          
          {/* 1. Mobile: Standard Links */}
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} className="flex items-center gap-3 p-3">
              <item.icon className="w-5 h-5" /> {item.name}
            </Link>
          ))}
          
          {/* 2. Mobile: Dashboard */}
          {user && (
            <Link to="/dashboard" className="flex items-center gap-3 p-3 text-[#1e90ff]">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
          )}

          {/* 3. Mobile: About */}
          <Link to="/about" className="flex items-center gap-3 p-3">
             <Info className="w-5 h-5" /> About
          </Link>

          {/* 4. Mobile: Auth */}
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-600 w-full text-left">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          ) : (
             <Link to="/login" className="flex items-center gap-3 p-3">Login</Link>
          )}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
             <div className="col-span-1 md:col-span-2">
                <Link to="/" className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-[#1e90ff]" />
                  <span className="text-lg font-semibold">Cyber Connect</span>
                </Link>
                <p className="text-sm text-[#717d8a] max-w-md">
                  Cyber Connect is a platform dedicated to connecting cybersecurity professionals,
                  enthusiasts, and victims of cyber attacks.
                </p>
                <div className="flex gap-4 mt-6">
                   <Github className="w-5 h-5 text-gray-500 hover:text-[#1e90ff]" />
                   <Twitter className="w-5 h-5 text-gray-500 hover:text-[#1e90ff]" />
                   <Linkedin className="w-5 h-5 text-gray-500 hover:text-[#1e90ff]" />
                </div>
             </div>
             <div>
                <h3 className="text-sm font-semibold mb-4 tracking-wider text-[#383e47]">RESOURCES</h3>
                <ul className="space-y-3">
                   <li><Link to="/threats" className="text-sm text-[#717d8a] hover:text-[#1e90ff]">Threat Database</Link></li>
                   <li><Link to="/faq" className="text-sm text-[#717d8a] hover:text-[#1e90ff]">FAQ</Link></li>
                   <li><Link to="/privacy-policy" className="text-sm text-[#717d8a] hover:text-[#1e90ff]">Privacy Policy</Link></li>
                </ul>
             </div>
           </div>
           <div className="mt-12 pt-8 border-t border-gray-200 text-center">
             <p className="text-sm text-[#717d8a]">&copy; {currentYear} Cyber Connect. All rights reserved.</p>
           </div>
        </div>
    </footer>
  )
}

export default Header;