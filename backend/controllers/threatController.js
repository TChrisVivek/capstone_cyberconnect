const Threat = require('../models/Threat');

// ✅ The 6 Hardcoded "Classic" Threats
const DEFAULT_THREATS = [
  {
    title: "Phishing Attacks",
    description: "Deceptive attempts to steal sensitive information like passwords and credit card numbers by masquerading as a trustworthy entity in emails or messages.",
    severity: "High",
    source: "Email / Web",
    date: new Date()
  },
  {
    title: "Ransomware",
    description: "Malicious software that encrypts a user's files and demands payment (ransom) in exchange for the decryption key.",
    severity: "Critical",
    source: "Malware",
    date: new Date()
  },
  {
    title: "DDoS Attacks",
    description: "Distributed Denial of Service: An attempt to disrupt normal traffic of a targeted server, service, or network by overwhelming the target with a flood of Internet traffic.",
    severity: "High",
    source: "Network",
    date: new Date()
  },
  {
    title: "SQL Injection (SQLi)",
    description: "A code injection technique where malicious SQL statements are inserted into an entry field for execution, often allowing attackers to view data they are not normally able to retrieve.",
    severity: "Critical",
    source: "Web Application",
    date: new Date()
  },
  {
    title: "Man-in-the-Middle (MitM)",
    description: "An attack where the attacker secretly relays and possibly alters the communications between two parties who believe they are directly communicating with each other.",
    severity: "Medium",
    source: "Network / WiFi",
    date: new Date()
  },
  {
    title: "Zero-Day Exploits",
    description: "Attacks that target a software vulnerability which is unknown to the software vendor or antivirus vendors, meaning no patch exists yet.",
    severity: "Critical",
    source: "Software Vulnerability",
    date: new Date()
  }
];

// Get all threats
exports.getThreats = async (req, res) => {
  try {
    // Fetch live threats from The Hacker News RSS feed via rss2json API
    const rssUrl = 'https://feeds.feedburner.com/TheHackersNews';
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(apiUrl);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        // Map the RSS feed items to match our Threat schema format
        const liveThreats = data.items.map(item => {
          // Determine a pseudo-severity based on keywords in title/description
          const text = (item.title + ' ' + item.description).toLowerCase();
          let severity = 'Medium';
          let source = 'Cyber News';
          
          if (text.includes('critical') || text.includes('0-day') || text.includes('zero-day') || text.includes('ransomware')) {
            severity = 'Critical';
          } else if (text.includes('breach') || text.includes('vulnerability') || text.includes('attack') || text.includes('hack')) {
            severity = 'High';
          }
          
          if (text.includes('malware') || text.includes('ransomware')) source = 'Malware';
          else if (text.includes('phishing') || text.includes('spam')) source = 'Phishing';
          else if (text.includes('flaw') || text.includes('vulnerability') || text.includes('patch')) source = 'Vulnerability';
          else if (text.includes('arrest') || text.includes('police')) source = 'Law Enforcement';

          return {
            _id: item.guid || item.link,
            title: item.title,
            description: item.description.replace(/<[^>]+>/g, '').substring(0, 200) + '...',
            severity: severity,
            source: source,
            date: new Date(item.pubDate),
            link: item.link,
            image: item.enclosure?.link || item.thumbnail || null
          };
        });
        
        return res.json(liveThreats);
      }
    }
    
    // Fallback: If API fails, check DB or use defaults
    const count = await Threat.countDocuments();
    if (count === 0) {
      console.log("⚠️ Database empty and API failed. Seeding with default hardcoded threats...");
      await Threat.insertMany(DEFAULT_THREATS);
    }
    const threats = await Threat.find().sort({ date: -1 });
    res.json(threats);

  } catch (error) {
    console.error("Live threat fetch error:", error.message);
    
    // Fallback to DB or Defaults
    try {
      const threats = await Threat.find().sort({ date: -1 }).limit(10);
      res.json(threats && threats.length > 0 ? threats : DEFAULT_THREATS);
    } catch (dbError) {
      console.warn("MongoDB is unreachable. Falling back to default threats.");
      res.json(DEFAULT_THREATS);
    }
  }
};

// Create a new threat (Admin usage)
exports.createThreat = async (req, res) => {
  try {
    const newThreat = new Threat(req.body);
    await newThreat.save();
    res.status(201).json(newThreat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};