import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

const stats = [
  { label: 'Cyber Attacks Daily (Global)', value: '2,200+' },
  { label: 'Avg. Data Breach Cost', value: '$4.45M' },
  { label: 'Attacks Start via Phishing', value: '90%+' },
];

export function AlternativeHero() {
  const [activeCard, setActiveCard] = useState(0);

  // Auto-rotate active card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "Detect Threats",
      description: "Stay ahead of cyber criminals with real-time threat intelligence and proactive alerts.",
      color: "from-blue-500/20 to-cyan-400/20 border-blue-400/30",
      textColor: "text-blue-500",
      accent: "text-[#1e90ff]",
    },
    {
      title: "Prevent Attacks",
      description: "Learn proven strategies to protect your personal and organizational data from common cyber attacks.",
      color: "from-emerald-500/20 to-teal-400/20 border-emerald-400/30",
      textColor: "text-emerald-500",
      accent: "text-emerald-500",
    },
    {
      title: "Recover Quickly",
      description: "Get immediate support and actionable guidance if you've been compromised or targeted by an attack.",
      color: "from-amber-500/20 to-orange-400/20 border-amber-400/30",
      textColor: "text-amber-500",
      accent: "text-amber-500",
    },
  ];

  return (
    <div className="relative pt-32 pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1e90ff]/5 rounded-full opacity-70  -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1e90ff]/5 rounded-full opacity-70  translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4  lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content: Heading and CTA */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#1e90ff]/10 text-[#1e90ff] px-3 py-1 rounded-full text-sm font-medium animate-fade-in">
              <Shield className="w-4 h-4" />
              Cybersecurity for Everyone
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-6xl font-extrabold tracking-tight leading-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
              Your journey to
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1e90ff] to-cyan-400 block pb-2">digital safety</span>
              starts here
            </h1>

            <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>
              Join our community of security experts and enthusiasts to learn,
              share experiences, and protect yourself in today's digital world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Link to="/register">
                <Button size="lg" className="gap-2 h-12 px-6 w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="gap-2 h-12 px-6 w-full sm:w-auto">
                  View Community
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 sm:gap-12 pt-8 border-t border-gray-100 animate-fade-in" style={{ animationDelay: '400ms' }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-2xl md:text-3xl font-extrabold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content: Rotating Cards */}
          <div className="relative h-[500px] animate-fade-in" style={{ animationDelay: '500ms' }}>
  <div className="absolute inset-0 flex items-center justify-center">
    {cards.map((card, index) => (
      <div
        key={index}
        className={`absolute w-[340px] p-8 rounded-[2rem] border-[1.5px] backdrop-blur-2xl transition-all duration-700 ease-out bg-gradient-to-br ${card.color} ${
          index === activeCard
            ? "opacity-100 z-30 scale-100 translate-y-0 shadow-[0_0_40px_rgba(30,144,255,0.15)]"
            : index === (activeCard + 1) % cards.length
            ? "opacity-60 z-20 scale-[0.92] translate-x-12 translate-y-8 blur-[1px]"
            : "opacity-30 z-10 scale-[0.85] -translate-x-12 translate-y-16 blur-[3px]"
        }`}
      >
        <h3 className={`text-2xl font-extrabold mb-3 ${card.textColor}`}>{card.title}</h3>
        <p className="text-gray-700 leading-relaxed text-sm font-medium">{card.description}</p>
      </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}