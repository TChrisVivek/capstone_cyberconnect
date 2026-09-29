import { Link } from 'react-router-dom';
import { Shield, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-blue-50 p-1.5 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">Cyber Connect</span>
            </Link>
            <p className="text-sm text-gray-600 max-w-md leading-relaxed">
              Cyber Connect is a platform dedicated to connecting cybersecurity professionals,
              enthusiasts, and victims of cyber attacks. Share knowledge, get support, and stay safe online.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://github.com/TChrisVivek" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Github">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/chris-vivek-t" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold mb-4 tracking-wider text-gray-900 uppercase">PLATFORM</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/threats" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Threats
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/report-issue" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Report Issue
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold mb-4 tracking-wider text-gray-900 uppercase">RESOURCES</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.cert-in.org.in/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  CERT-In (India)
                </a>
              </li>
              <li>
                <a href="https://www.cisa.gov/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  CISA (US)
                </a>
              </li>
              <li>
                <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Report Cybercrime (India)
                </a>
              </li>
              <li>
                <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  NIST Framework
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Cyber Connect. Built as a Capstone Project for Cybersecurity Awareness.
          </p>
        </div>
      </div>
    </footer>
  );
}