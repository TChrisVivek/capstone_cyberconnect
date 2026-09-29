import { useEffect } from 'react';
import Header from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { AlternativeHero } from '../components/home/AlternativeHero';
import { ThreatInsights } from '../components/home/ThreatInsights';
import { ScrollingTestimonials } from '../components/home/ScrollingTestimonials';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle2, Shield, Lock, BarChart3 } from 'lucide-react';

const Index = () => {
  // Smooth scroll for hash links
  useEffect(() => {
    const handleHashLinkClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('click', handleHashLinkClick);
    return () => document.removeEventListener('click', handleHashLinkClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>

      <main className="flex-1">
        {/* Alternative Hero Section */}
        <AlternativeHero />

        {/* Why Choose Us Section */}
        <section className="py-24 relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#1e90ff]/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 bg-white text-[#1e90ff] px-3 py-1 rounded-full text-sm font-medium mb-2">
                  <Shield className="w-4 h-4" />
                  Our Mission
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">Empowering everyone to navigate cybersecurity with confidence</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Cyber Connect, we believe that cybersecurity knowledge shouldn't be confined to experts.
                  Our community-driven platform makes it accessible for everyone to learn, share, and protect themselves in today's digital world.
                </p>

                <div className="space-y-4 pt-4">
                  {[
                    "Expert-verified security guides and tutorials",
                    "Real-time threat alerts from our community",
                    "Personalized security recommendations",
                    "Support for cybercrime victims"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 rounded-full p-0.5 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link to="/about">
                    <Button variant="outline" size="lg" className="gap-2">
                      Learn more about our mission
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#1e90ff] rounded-full blur-[80px] opacity-20 -z-10" />
                
                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3">Threat Intelligence</h3>
                  <p className="text-gray-600 leading-relaxed text-sm font-medium">Stay informed about the latest cybersecurity threats and vulnerabilities.</p>
                </div>

                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl shadow-emerald-900/5 hover:-translate-y-2 transition-all duration-500 sm:mt-12">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                    <Lock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3">Privacy Protection</h3>
                  <p className="text-gray-600 leading-relaxed text-sm font-medium">Learn best practices for safeguarding your personal information online.</p>
                </div>

                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl shadow-purple-900/5 hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3">Risk Assessment</h3>
                  <p className="text-gray-600 leading-relaxed text-sm font-medium">Evaluate your digital security posture and identify areas for improvement.</p>
                </div>

                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl shadow-amber-900/5 hover:-translate-y-2 transition-all duration-500 sm:mt-12">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3">Recovery Support</h3>
                  <p className="text-gray-600 leading-relaxed text-sm font-medium">Get help recovering from cyber attacks and preventing future incidents.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Threat Insights Section */}
        <ThreatInsights />

        {/* Testimonials Section */}
        <ScrollingTestimonials />

        {/* CTA Section */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e90ff] via-[#1e90ff] to-cyan-500 -z-10"></div>
          <div className="absolute inset-0 opacity-20 -z-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '32px 32px'}}></div>
          
          {/* Glowing orbs for CTA */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-[100px] -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white tracking-tight">Ready to secure your digital life?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Join our growing community of security-conscious individuals who use Cyber Connect
              to stay protected in an increasingly complex digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 font-bold bg-white text-[#1e90ff] hover:bg-gray-50 h-14 px-8 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-shadow border-0 rounded-xl"
                >
                  Join our community for free
                </Button>
              </Link>
              <Link to="/community">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 font-bold border-2 border-white/40 text-white hover:bg-white/10 h-14 px-8 backdrop-blur-md rounded-xl"
                >
                  Explore community
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;