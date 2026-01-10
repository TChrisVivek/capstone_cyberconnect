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
      const response = await api.post('/users/login', {
        email: data.email,
        password: data.password
      });

      localStorage.setItem('user', JSON.stringify(response.data));

      toast({
        title: "Login successful",
        description: "Welcome back to Cyber Connect!",
      });

      navigate('/');

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
      const response = await api.post('/users/google-login', { token: credential });
      
      localStorage.setItem('user', JSON.stringify(response.data));
      
      toast({ 
        title: "Welcome!", 
        description: `Logged in as ${response.data.name}` 
      });
      
      navigate('/');
      
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

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                toast({ title: "Error", description: "Google Login Failed", variant: "destructive" });
              }}
            />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;