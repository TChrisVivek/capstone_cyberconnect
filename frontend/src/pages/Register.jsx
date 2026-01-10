import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AuthForm } from '../components/auth/AuthForm';
import { useToast } from '../hooks/use-toast';
import api from '../lib/api'; // 1. Import the API helper

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // 2. Make this function async
  const handleRegister = async (data) => {
    console.log('Register attempt:', data);

    // Password validation check (Client side)
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      // 3. Send data to Backend
      // We explicitly map the fields to ensure they match what the User Model expects
      const payload = {
        name: data.name,       // Ensure your AuthForm collects 'name'
        email: data.email,
        password: data.password,
        role: "user"           // Default role (you can change this logic later)
      };

      const response = await api.post('/users', payload);

      // Success handling
      toast({
        title: "Registration successful",
        description: "Welcome to Cyber Connect!",
      });

      // Redirect to dashboard (or /login if you prefer them to sign in first)
      navigate('/');

    } catch (error) {
      // 4. Error handling
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.error || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
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