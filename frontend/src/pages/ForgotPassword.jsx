import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // --- SIMULATION ---
    // Simulate a network delay to make it feel real
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Reset Link Sent",
        description: "Check your inbox for further instructions.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950 pt-24 pb-16">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg animate-fade-in border border-gray-200 dark:border-gray-800">
          
          {/* --- SUCCESS STATE (Check Inbox) --- */}
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-500" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Check your inbox
              </h1>
              
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                We have sent a password reset link to <br/>
                <span className="font-medium text-gray-800 dark:text-gray-200">{email}</span>
              </p>

              <Button 
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="w-full border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Try another email
              </Button>
              
              <div className="mt-6">
                 <Link to="/login" className="text-sm font-medium text-[#1e90ff] hover:underline flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                 </Link>
              </div>
            </div>
          ) : (
            
            /* --- FORM STATE --- */
            <div>
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Mail className="w-6 h-6 text-[#1e90ff]" />
              </div>

              <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                Forgot Password?
              </h1>
              
              <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
                No worries! Enter your email and we'll send you reset instructions.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:border-[#1e90ff] transition-all"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-[#1e90ff] hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium transition-colors"
                >
                  {loading ? "Sending..." : "Reset Password"}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <Link to="/login" className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;