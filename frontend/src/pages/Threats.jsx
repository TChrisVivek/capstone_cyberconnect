import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ThreatList } from '../components/threats/ThreatList';

const Threats = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {/* Changed px-20 to max-w-7xl mx-auto px-4 sm:px-6 to match Header alignment */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Cybersecurity Threat Database</h1>
            <p className="text-gray-500 text-lg">Explore common cyber threats, their severity, and how to prevent them.</p>
        </div>
        <ThreatList />
      </main>
      <Footer />
    </div>
  );
};

export default Threats;