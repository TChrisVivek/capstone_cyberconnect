import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Shield, MessageSquare, AlertTriangle, LayoutDashboard, Code2, Server, Database, Lock } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] relative overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-br from-[#1e90ff]/10 via-cyan-300/10 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-20 pt-32">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold tracking-wide">
            <Shield className="w-4 h-4" />
            Capstone Project by Chris Vivek T
          </div>
          <h1 className="text-[40px] md:text-[56px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Defending the Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e90ff] to-cyan-500">Frontier</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
            Cyber Connect is a centralized intelligence hub and community platform dedicated to empowering individuals and organizations against modern cybersecurity threats.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Mission & Vision */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">The Growing Threat Landscape</h2>
              <p className="text-[17px] text-slate-500 leading-relaxed">
                With cyber attacks increasing at an alarming rate—over 1.3 million incidents reported to CERT-In in a single year—many individuals remain vulnerable to phishing, identity theft, malware, and data breaches due to a lack of awareness.
              </p>
              <p className="text-[17px] text-slate-500 leading-relaxed">
                Cyber Connect bridges this critical gap. By providing real-time threat intelligence and fostering a collaborative Slack-style community, we aim to transform vulnerable users into informed digital defenders.
              </p>
            </div>
            <div className="bg-white rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 blur-[50px] rounded-full"></div>
              <Lock className="w-12 h-12 text-[#1e90ff] mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-[17px] text-slate-500 leading-relaxed">
                To build a safer digital world by democratizing cybersecurity knowledge, enabling rapid incident reporting, and cultivating a proactive community of security-conscious individuals.
              </p>
            </div>
          </section>

          {/* Platform Features */}
          <section>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-10 text-center">Core Capabilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform border border-transparent hover:border-gray-100">
                <div className="w-14 h-14 bg-red-50 rounded-[20px] flex items-center justify-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Threat Intelligence</h3>
                <p className="text-[15px] text-slate-500 leading-relaxed">Real-time alerts on vulnerabilities, zero-days, and active campaigns sourced from live global feeds.</p>
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform border border-transparent hover:border-gray-100">
                <div className="w-14 h-14 bg-blue-50 rounded-[20px] flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-[#1e90ff]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Community Hub</h3>
                <p className="text-[15px] text-slate-500 leading-relaxed">A dedicated space for professionals and enthusiasts to share security tips, reverse engineering analysis, and support.</p>
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform border border-transparent hover:border-gray-100">
                <div className="w-14 h-14 bg-orange-50 rounded-[20px] flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Incident Reporting</h3>
                <p className="text-[15px] text-slate-500 leading-relaxed">Streamlined tools for users to report phishing, fraud, and cyberbullying, creating a safer digital ecosystem.</p>
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform border border-transparent hover:border-gray-100">
                <div className="w-14 h-14 bg-purple-50 rounded-[20px] flex items-center justify-center mb-6">
                  <LayoutDashboard className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Activity Dashboard</h3>
                <p className="text-[15px] text-slate-500 leading-relaxed">Personalized tracking of your security reports, community engagement, and account telemetry.</p>
              </div>

            </div>
          </section>

          {/* Tech Stack */}
          <section className="bg-slate-900 rounded-[40px] p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight mb-12">System Architecture</h2>
              <div className="grid md:grid-cols-3 gap-8">
                
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Code2 className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold">Frontend UI</h3>
                  </div>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> React 19 + Vite</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Tailwind CSS v4</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> React Router v7</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Lucide Icons</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Server className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-xl font-bold">Backend API</h3>
                  </div>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Node.js + Express.js</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> JWT Authentication</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> RESTful Architecture</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Multer (File Uploads)</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Database className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold">Database & Cloud</h3>
                  </div>
                  <ul className="space-y-3 text-slate-400">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> MongoDB Atlas</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Mongoose ODM</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> bcrypt.js Encryption</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Cloud Storage Ready</li>
                  </ul>
                </div>

              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;