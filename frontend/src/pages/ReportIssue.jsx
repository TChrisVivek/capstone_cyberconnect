import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { AlertTriangle, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import api from '../lib/api';

const ReportIssue = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Form State
  // ✅ Changed 'type' to 'category' to match your Backend Controller
  const [formData, setFormData] = useState({
    title: '',
    category: 'Phishing', 
    description: ''
  });

  // Check if user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // Redirect if not logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ FIXED: Removed userId from URL. 
      // The API now knows who you are from the Token in api.js
      await api.post('/complaints', formData);

      // Success Message
      toast({ 
        title: "Report Submitted", 
        description: "Our experts will review your issue shortly." 
      });

      // Clear Form
      setFormData({ title: '', category: 'Phishing', description: '' });
      
      // Redirect to Dashboard to see the new log
      navigate('/dashboard'); 

    } catch (error) {
      console.error("Submission error:", error);
      toast({ 
        title: "Submission Failed", 
        description: error.response?.data?.error || "Please try again later.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-24 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-red-50 p-8 border-b border-red-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Report a Cyber Issue</h1>
            <p className="text-gray-600 mt-2">
              Describe the threat or incident. Your report helps keep the community safe.
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Received suspicious email from bank"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1e90ff]"
                />
              </div>

              {/* Category Dropdown (Renamed from Type) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1e90ff] bg-white"
                >
                  <option value="Phishing">Phishing Attempt</option>
                  <option value="Identity Theft">Identity Theft</option>
                  <option value="Hacking">Hacking / Unauthorized Access</option>
                  <option value="Financial Fraud">Financial Fraud</option>
                  <option value="Cyberbullying">Cyberbullying</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Description Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
                <textarea
                  required
                  rows="5"
                  placeholder="Provide as much detail as possible..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#1e90ff]"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? 'Submitting...' : 'Submit Report'} 
                {!loading && <Send className="w-4 h-4" />}
              </Button>

            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportIssue;