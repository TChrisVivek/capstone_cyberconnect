import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Shield, Bug } from 'lucide-react'; 
import api from '../lib/api'; 
import { useToast } from '../hooks/use-toast';

const ReportIssue = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // 1. STATE: Which form mode are we in?
  const [reportType, setReportType] = useState('incident'); 

  // 2. STATE: Form Data (Combined)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // Incident specific
    affectedSystems: '',
    impact: 'Low',
    priority: 'Medium',
    // Complaint specific
    category: 'Platform Bug',
    contactEmail: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (reportType === 'incident') {
        // --- LOGIC FOR INCIDENTS ---
        const userId = user?._id || user?.id || user?.userId;

        if (!user) {
          toast({ title: "Error", description: "You must be logged in to report an incident.", variant: "destructive" });
          setLoading(false);
          return;
        }

        if (!userId) {
          toast({ title: "Error", description: "User ID not found. Please log out and log in again.", variant: "destructive" });
          setLoading(false);
          return;
        }

        const payload = {
          title: formData.title,
          description: formData.description,
          affectedSystems: formData.affectedSystems,
          impact: formData.impact,
          user_id: userId 
        };

        console.log("🚀 Sending Incident to Backend:", payload);
        await api.post('/incidents', payload);
        
        toast({ title: "Incident Reported", description: "Security team has been notified." });
        navigate('/dashboard'); 

      } else {
        // --- ✅ LOGIC FOR COMPLAINTS (UPDATED) ---
        
        const complaintPayload = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          // Use the email they typed, OR their account email, OR null
          contactEmail: formData.contactEmail || user?.email || "", 
          user_id: user?._id || user?.id || null // Optional for complaints
        };

        console.log("🚀 Sending Complaint to Backend:", complaintPayload);

        // Send to the new API route
        await api.post('/complaints', complaintPayload);
        
        toast({ title: "Feedback Received", description: "Thank you for helping us improve!" });
        navigate('/'); 
      }

    } catch (error) {
      console.error("❌ Submission Error:", error);
      toast({ title: "Submission Failed", description: error.response?.data?.error || "Server Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-24 max-w-2xl">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Report an Issue</h1>
            <p className="text-gray-500">Select the type of issue you are facing below.</p>
          </div>

          {/* --- TYPE SELECTOR --- */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setReportType('incident')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                reportType === 'incident' 
                  ? 'border-[#1e90ff] bg-[#1e90ff]/5 text-[#1e90ff]' 
                  : 'border-gray-100 hover:border-gray-200 text-gray-500'
              }`}
            >
              <Shield className="w-8 h-8" />
              <span className="font-semibold">Security Incident</span>
              <span className="text-xs opacity-70">I was hacked / Malware</span>
            </button>

            <button
              type="button"
              onClick={() => setReportType('complaint')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                reportType === 'complaint' 
                  ? 'border-[#1e90ff] bg-[#1e90ff]/5 text-[#1e90ff]' 
                  : 'border-gray-100 hover:border-gray-200 text-gray-500'
              }`}
            >
              <Bug className="w-8 h-8" />
              <span className="font-semibold">Website Issue</span>
              <span className="text-xs opacity-70">Bug / Suggestion</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Common Field: Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder={reportType === 'incident' ? "e.g., Phishing Email Detected" : "e.g., Login button not working"}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/20 focus:border-[#1e90ff]"
              />
            </div>

            {/* --- CONDITIONAL FIELDS: INCIDENT --- */}
            {reportType === 'incident' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Impact Level</label>
                    <select
                      name="impact"
                      value={formData.impact}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/20"
                    >
                      <option value="Low">Low - No Data Loss</option>
                      <option value="Medium">Medium - System Slow</option>
                      <option value="High">High - Data Breach</option>
                      <option value="Critical">Critical - System Down</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Affected System</label>
                    <input
                      type="text"
                      name="affectedSystems"
                      required
                      value={formData.affectedSystems}
                      onChange={handleChange}
                      placeholder="e.g., Laptop, Server, Email"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/20"
                    />
                  </div>
                </div>
              </>
            )}

            {/* --- CONDITIONAL FIELDS: COMPLAINT --- */}
            {reportType === 'complaint' && (
              <>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/20"
                    >
                    <option>Platform Bug</option>
                    <option>UI/UX Suggestion</option>
                    <option>Account Issue</option>
                    <option>Other</option>
                    </select>
                </div>
                
                {/* ✅ Added Email Field for Complaints */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email (Optional)</label>
                    <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="Your email for updates..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/20"
                    />
                </div>
              </>
            )}

            {/* Common Field: Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe the issue in detail..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/20 focus:border-[#1e90ff]"
              ></textarea>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[#1e90ff] hover:bg-[#1e90ff]/90 text-white py-6 text-lg">
              {loading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </form>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportIssue;