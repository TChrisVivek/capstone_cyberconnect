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
    // 1. Check if the database is empty
    const count = await Threat.countDocuments();

    // 2. If empty, Seed it with our Default Data
    if (count === 0) {
      console.log("⚠️ Database empty. Seeding with default hardcoded threats...");
      await Threat.insertMany(DEFAULT_THREATS);
    }

    // 3. Fetch from DB
    const threats = await Threat.find().sort({ date: -1 });
    res.json(threats);

  } catch (error) {
    res.status(500).json({ error: error.message });
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