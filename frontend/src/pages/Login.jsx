import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AuthForm } from '../components/auth/AuthForm';
import { useToast } from '../hooks/use-toast';
import api from '../lib/api'; 
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (data) => {
    try {
      const response = await api.post('/api/users/login', {
        email: data.email,
        password: data.password
      });

      // ✅ 1. Save Token to Local Storage
      localStorage.setItem('user', JSON.stringify(response.data));

      toast({
        title: "Login successful",
        description: "Welcome back to Cyber Connect!",
      });

      // ✅ 2. Redirect to Dashboard (Better UX than Home)
      navigate('/dashboard');

    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.error || "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const response = await api.post('/api/users/google-login', { token: credential });
      
      // ✅ Save Google User Token too
      localStorage.setItem('user', JSON.stringify(response.data));
      
      toast({ 
        title: "Welcome!", 
        description: `Logged in as ${response.data.name}` 
      });
      
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Google Auth Error:", error);
      toast({ 
        title: "Login Failed", 
        description: "Google authentication failed.", 
        variant: "destructive" 
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 bg-white pt-24 pb-16">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg animate-fade-in">
          
          <AuthForm type="login" onSubmit={handleLogin} />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                toast({ title: "Error", description: "Google Login Failed", variant: "destructive" });
              }}
            />
            
            {/* BYPASS BUTTON FOR LOCAL TESTING */}
            <button
              onClick={() => {
                const mockUser = {
                  _id: "test-admin-123",
                  name: "Test Admin",
                  email: "admin@cyberconnect.local",
                  role: "admin",
                  token: "mock-jwt-token-for-testing"
                };
                localStorage.setItem('user', JSON.stringify(mockUser));
                toast({ title: "Bypass Successful", description: "Logged in as Test Admin" });
                navigate('/dashboard');
              }}
              className="text-xs text-gray-400 hover:text-[#1e90ff] underline underline-offset-2 transition-colors"
            >
              Bypass Login (Test Mode)
            </button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;