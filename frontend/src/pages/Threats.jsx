import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import api from '../lib/api';
import { Shield, AlertTriangle, AlertOctagon, Info, Activity } from 'lucide-react';

const Threats = () => {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThreats();
  }, []);

  const fetchThreats = async () => {
    try {
      const response = await api.get('/threats');
      setThreats(response.data);
    } catch (error) {
      console.error("Failed to fetch threats", error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return <AlertOctagon className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-red-500/10 rounded-lg">
               <Activity className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Live Threat Feed</h1>
              <p className="text-gray-500">Real-time alerts and vulnerability reports.</p>
            </div>
          </div>

          {loading ? (
             <div className="text-center py-20 text-gray-400">Loading threat intelligence...</div>
          ) : threats.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800">System Secure</h3>
              <p className="text-gray-500">No active threats detected at this time.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {threats.map((threat) => (
                <div key={threat._id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-2 border ${getSeverityColor(threat.severity)}`}>
                      {getIcon(threat.severity)} {threat.severity}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(threat.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{threat.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{threat.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                    <span>Source: {threat.source}</span>
                    <button className="text-blue-600 font-medium hover:underline">View Details →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Threats;