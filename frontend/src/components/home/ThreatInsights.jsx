import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  AlertTriangle,
  Shield,
  LockKeyhole,
  Activity,
  ExternalLink,
  TrendingUp
} from 'lucide-react';
import { Button } from '../ui/Button';



// Threats data
const threats = [
  {
    id: 1,
    title: 'Phishing Attacks',
    description: 'Deceptive attempts to steal sensitive information by impersonating trustworthy entities.',
    icon: AlertTriangle,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    percent: 65,
    trend: '+12% since last month',
    trendUp: true,
  },
  {
    id: 2,
    title: 'Ransomware',
    description: 'Malware that encrypts files and demands payment for decryption keys.',
    icon: LockKeyhole,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    percent: 72,
    trend: '+8% since last month',
    trendUp: true,
  },
  {
    id: 3,
    title: 'Data Breaches',
    description: 'Unauthorized access to sensitive, protected, or confidential data.',
    icon: Shield,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    percent: 58,
    trend: '-3% since last month',
    trendUp: false,
  },
  {
    id: 4,
    title: 'DDoS Attacks',
    description: 'Attempts to disrupt normal traffic of a targeted server by overwhelming it with a flood of traffic.',
    icon: Activity,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    percent: 43,
    trend: '+5% since last month',
    trendUp: true,
  },
];

export function ThreatInsights() {
  const [hoveredThreat, setHoveredThreat] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Latest Threat Insights
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stay informed about the most prevalent cyber threats and learn how to protect yourself against them.
            </p>
          </div>
          <Link to="/threats">
            <Button variant="outline" className="gap-1 group hover:border-[#1e90ff]/70">
              View all threats
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Desktop grid view (removed mobile carousel logic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {threats.map((threat) => (
            <ThreatCard
              key={threat.id}
              threat={threat}
              hoveredThreat={hoveredThreat}
              setHoveredThreat={setHoveredThreat}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Separated ThreatCard component for reusability
const ThreatCard = ({ threat, hoveredThreat, setHoveredThreat }) => {
  const isHovered = hoveredThreat === threat.id;

  return (
    <div
      className="group bg-white rounded-[32px] p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer border border-transparent hover:border-gray-100"
      onMouseEnter={() => setHoveredThreat(threat.id)}
      onMouseLeave={() => setHoveredThreat(null)}
    >
      {/* Top Row: Icon and Trend */}
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 flex items-center justify-center bg-white border border-gray-100 rounded-[20px] shadow-sm group-hover:scale-105 group-hover:border-blue-100 transition-all duration-300 ${threat.color}`}>
          <threat.icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${threat.trendUp ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>
          <TrendingUp className={`w-3.5 h-3.5 ${threat.trendUp ? "" : "rotate-180 transform"}`} />
          {threat.trend.split(' ')[0]}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-[22px] font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
        {threat.title}
      </h3>
      <p className="text-slate-500 text-[15px] leading-relaxed mb-6 flex-grow">
        {threat.description}
      </p>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-100 mb-5"></div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Prevalence</span>
        <span className={`text-[16px] font-extrabold ${threat.color}`}>{threat.percent}%</span>
      </div>

      {/* Action Link */}
      <div className="mt-auto">
        <Link to="/threats" className="inline-flex items-center text-[14px] font-bold text-slate-600 hover:text-blue-600 transition-colors">
          Learn how to protect yourself
          <ExternalLink className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

