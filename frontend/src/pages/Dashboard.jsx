import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Shield, Activity, Clock, User } from 'lucide-react';
import api from '../lib/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get User from Local Storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchLogs(storedUser._id || storedUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  // 2. Fetch Logs from Backend
  const fetchLogs = async (userId) => {
    try {
      const response = await api.get(`/logs/${userId}`);
      setLogs(response.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-24 max-w-6xl">
        
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8 flex items-center gap-6">
          <div className="w-16 h-16 bg-[#1e90ff]/10 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-[#1e90ff]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-500 mt-1">Here is what has been happening with your account.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Activity Log */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#1e90ff]" /> Recent Activity
                </h2>
                <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                  Last 10 Actions
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">Loading activity...</div>
                ) : logs.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No activity recorded yet.</div>
                ) : (
                  logs.map((log) => (
                    <div key={log._id} className="p-4 hover:bg-gray-50 transition-colors flex gap-4">
                      <div className="mt-1">
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-[#1e90ff]" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{log.action}</p>
                        <p className="text-sm text-gray-500">{log.details}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(log.createdAt)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Account Status */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" /> Account Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Role</span>
                  <span className="font-medium capitalize">{user?.role || "User"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Email Verified</span>
                  <span className="text-green-600 font-medium">Yes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-medium">2024</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;