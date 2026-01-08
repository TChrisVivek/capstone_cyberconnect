import { useState } from 'react';
import { Search, Shield, AlertTriangle, Lock, Server, Mail, Globe, Eye, FileWarning } from 'lucide-react';
import { Button } from '../ui/Button';

// --- STATIC DATA: Common Cyber Threats ---
// We use this to populate the page immediately without needing a database yet.
const THREATS_DATA = [
  {
    id: 1,
    title: "Phishing Attacks",
    category: "Social Engineering",
    severity: "High",
    icon: Mail,
    description: "Fraudulent attempts to obtain sensitive information like usernames, passwords, and credit card details by disguising as a trustworthy entity.",
    prevention: "Verify sender email addresses, do not click suspicious links, and enable Multi-Factor Authentication (MFA)."
  },
  {
    id: 2,
    title: "Ransomware",
    category: "Malware",
    severity: "Critical",
    icon: Lock,
    description: "A type of malicious software designed to block access to a computer system until a sum of money is paid.",
    prevention: "Regularly back up data, keep software updated, and use reputable antivirus software."
  },
  {
    id: 3,
    title: "DDoS Attack",
    category: "Network",
    severity: "High",
    icon: Server,
    description: "Distributed Denial of Service: Flooding a target server with traffic to disrupt normal traffic of a targeted server, service, or network.",
    prevention: "Use DDoS mitigation services (like Cloudflare), monitor traffic patterns, and configure firewalls."
  },
  {
    id: 4,
    title: "SQL Injection",
    category: "Web Application",
    severity: "Critical",
    icon: Globe,
    description: "Attackers interfere with the queries an application makes to its database, allowing them to view or modify data they shouldn't access.",
    prevention: "Use prepared statements (parameterized queries), sanitize input, and use Web Application Firewalls (WAF)."
  },
  {
    id: 5,
    title: "Man-in-the-Middle",
    category: "Network",
    severity: "Medium",
    icon: Eye,
    description: "An attacker secretly relays and possibly alters the communications between two parties who believe they are directly communicating with each other.",
    prevention: "Use HTTPS/SSL for all websites, avoid public Wi-Fi for sensitive transactions, and use VPNs."
  },
  {
    id: 6,
    title: "Zero-Day Exploit",
    category: "Vulnerability",
    severity: "Critical",
    icon: FileWarning,
    description: "An attack that targets a software vulnerability which is unknown to the software vendor or has no patch available yet.",
    prevention: "Keep systems updated automatically, use threat intelligence services, and segment networks."
  }
];

export function ThreatList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  // Filter Logic
  const filteredThreats = THREATS_DATA.filter((threat) => {
    const matchesSearch = threat.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          threat.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'All' || threat.severity === selectedSeverity;
    
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-8">
      
      {/* --- SEARCH & FILTER BAR --- */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search threats..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Critical', 'High', 'Medium', 'Low'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedSeverity(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedSeverity === level 
                  ? 'bg-[#1e90ff] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* --- THREAT GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThreats.map((threat) => (
          <div key={threat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            
            {/* Card Header */}
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${
                  threat.severity === 'Critical' ? 'bg-red-100 text-red-600' :
                  threat.severity === 'High' ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <threat.icon className="w-6 h-6" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  threat.severity === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                  threat.severity === 'High' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                  'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  {threat.severity}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{threat.title}</h3>
              <p className="text-sm text-gray-500 font-medium mb-3 uppercase tracking-wider">{threat.category}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {threat.description}
              </p>
            </div>

            {/* Card Footer (Prevention) */}
            <div className="mt-auto bg-gray-50 p-4 border-t border-gray-100">
              <div className="flex gap-2 items-start">
                <Shield className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-900">Prevention: </span>
                  {threat.prevention}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredThreats.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No threats found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}