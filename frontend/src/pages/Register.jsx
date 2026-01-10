import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AuthForm } from '../components/auth/AuthForm';
import { useToast } from '../hooks/use-toast';
import api from '../lib/api'; 

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (data) => {
    // 1. Client-side Password Validation
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "user" // Default role
      };

      // 2. Send to Backend (POST /api/users)
      const response = await api.post('/users', payload);

      // 3. ✅ CRITICAL: Save User & Token to LocalStorage
      // This logs them in immediately so they can access the Dashboard
      localStorage.setItem('user', JSON.stringify(response.data));

      // Success handling
      toast({
        title: "Registration successful",
        description: "Welcome to Cyber Connect!",
      });

      // 4. Redirect to Dashboard (Protected Route)
      navigate('/dashboard');

    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.error || "Something went wrong. Please try again.",
        variant: "destructive",
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
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg animate-fade-in ">
          <AuthForm type="register" onSubmit={handleRegister} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;