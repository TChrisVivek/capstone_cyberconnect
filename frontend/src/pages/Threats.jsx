import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import api from '../lib/api';
import { Shield, AlertTriangle, AlertOctagon, Info, Activity, ExternalLink } from 'lucide-react';

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

  const getSeverityStyle = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4 bg-gray-50/50">
        <div className="max-w-5xl mx-auto">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-full bg-red-100 text-red-600 mb-4">
              <Activity className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Threat Intelligence Feed</h1>
            <p className="text-gray-500 max-w-xl mx-auto">Real-time alerts, vulnerabilities, and security advisories monitored by the CyberConnect network.</p>
          </div>

          {/* Content */}
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#1e90ff] rounded-full animate-spin mb-4"></div>
                Loading intel...
             </div>
          ) : threats.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Shield className="w-16 h-16 text-green-500 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-bold text-gray-800">System Secure</h3>
              <p className="text-gray-500 mt-2">No active threats detected at this time.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {threats.map((threat) => (
                <div key={threat._id} className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#1e90ff]/30 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
                    
                    {/* Left: Icon & Info */}
                    <div className="flex gap-4">
                      <div className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border ${getSeverityStyle(threat.severity)}`}>
                         {getIcon(threat.severity)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#1e90ff] transition-colors">{threat.title}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border ${getSeverityStyle(threat.severity)}`}>
                            {threat.severity}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{threat.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                          <span>Source: {threat.source}</span>
                          <span>•</span>
                          <span>{new Date(threat.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action */}
                    <div className="shrink-0 pt-1">
                      <button className="text-gray-400 hover:text-[#1e90ff] transition-colors p-2 hover:bg-blue-50 rounded-full">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>

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