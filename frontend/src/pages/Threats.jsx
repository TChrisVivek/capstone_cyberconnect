import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import api from '../lib/api';
import { Shield, AlertTriangle, AlertOctagon, Zap, Globe, Lock, Server } from 'lucide-react';

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

  // Dynamic Icon Helper
  const getDynamicIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('phishing')) return <Globe className="w-6 h-6" />;
    if (t.includes('ransomware') || t.includes('malware')) return <AlertOctagon className="w-6 h-6" />;
    if (t.includes('ddos') || t.includes('network')) return <Server className="w-6 h-6" />;
    if (t.includes('injection')) return <Zap className="w-6 h-6" />;
    if (t.includes('password') || t.includes('credential')) return <Lock className="w-6 h-6" />;
    return <AlertTriangle className="w-6 h-6" />;
  };

  const getSeverityStyle = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/30">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16 space-y-4">
             <div className="inline-flex items-center justify-center p-3 bg-blue-600/10 rounded-2xl mb-2">
                <Shield className="w-8 h-8 text-[#1e90ff]" />
             </div>
             <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Common Cyber Threats
             </h1>
             <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Stay informed about the most prevalent security risks in today's digital landscape.
             </p>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-[#1e90ff] rounded-full animate-spin"></div>
             </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {threats.map((threat) => (
                <div key={threat._id} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#1e90ff]/10 group-hover:text-[#1e90ff] transition-colors">
                       {getDynamicIcon(threat.title)}
                    </div>
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide border ${getSeverityStyle(threat.severity)}`}>
                        {threat.severity}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1e90ff] transition-colors">
                    {threat.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {threat.description}
                  </p>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                        Type: <span className="text-gray-600">{threat.source}</span>
                    </span>
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