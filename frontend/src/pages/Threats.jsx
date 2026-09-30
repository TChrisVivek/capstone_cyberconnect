import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import api from '../lib/api';
import { Shield, AlertTriangle, AlertOctagon, Zap, Globe, Lock, Server } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Threats = () => {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchThreats();
  }, []);

  const fetchThreats = async () => {
    try {
      const response = await api.get('/api/threats');
      setThreats(response.data);
    } catch (error) {
      console.error("Failed to fetch threats", error);
      toast({ title: "Error", description: "Failed to load live threats.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Helper to match icons to our specific hardcoded titles
  const getDynamicIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('phishing')) return <Globe className="w-6 h-6" />;
    if (t.includes('ransomware') || t.includes('malware')) return <AlertOctagon className="w-6 h-6" />;
    if (t.includes('ddos') || t.includes('mitm')) return <Server className="w-6 h-6" />;
    if (t.includes('injection') || t.includes('zero-day')) return <Zap className="w-6 h-6" />;
    if (t.includes('password') || t.includes('credential')) return <Lock className="w-6 h-6" />;
    return <AlertTriangle className="w-6 h-6" />;
  };

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-14 space-y-4">
             <h1 className="text-[40px] md:text-[48px] font-extrabold text-slate-900 tracking-tight">
                Live Cyber Intel
             </h1>
             <p className="text-[17px] text-slate-500 max-w-2xl font-medium leading-relaxed">
                Real-time tracking of the most prevalent security risks, zero-days, and vulnerabilities.
             </p>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
                <div className="relative w-12 h-12">
                   <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-slate-900 rounded-full border-t-transparent animate-spin"></div>
                </div>
             </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {threats.map((threat) => {
                const CardWrapper = threat.link ? 'a' : 'div';
                const wrapperProps = threat.link ? { href: threat.link, target: '_blank', rel: 'noopener noreferrer' } : {};
                
                return (
                <CardWrapper {...wrapperProps} key={threat._id} className="group bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer border border-transparent hover:border-gray-100 overflow-hidden">
                  
                  {/* Cover Image */}
                  {threat.image ? (
                    <div className="w-full h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={threat.image} alt={threat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="w-full h-48 overflow-hidden bg-slate-900 flex items-center justify-center relative flex-shrink-0">
                       <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 to-transparent pointer-events-none"></div>
                       <Shield className="w-16 h-16 text-white/30" />
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-grow">
                    {/* Top Row: Icon & Severity */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-white border border-gray-100 rounded-lg shadow-sm text-slate-700 group-hover:scale-105 group-hover:text-blue-600 group-hover:border-blue-100 transition-all duration-300">
                         {getDynamicIcon(threat.title)}
                      </div>
                      <span className={`text-[11px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wide border ${getSeverityStyle(threat.severity)}`}>
                          {threat.severity}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-[22px] font-bold text-slate-900 mb-3 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {threat.title}
                    </h3>
                    <p className="text-slate-500 text-[15px] leading-relaxed mb-6 flex-grow line-clamp-3">
                      {threat.description}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-gray-100 mb-5"></div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors"></span>
                          <span className="text-[14px] font-bold text-slate-600 line-clamp-1">{threat.source || "General"}</span>
                      </div>
                      <span className="bg-gray-50 text-slate-500 text-[13px] font-bold px-3 py-1.5 rounded-lg border border-gray-100 whitespace-nowrap ml-2">
                        {new Date(threat.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardWrapper>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Threats;