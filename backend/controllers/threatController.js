const Threat = require('../models/Threat');

// 1. Define Common Threats with Concise Descriptions (2-3 lines)
const COMMON_THREATS = [
  {
    title: "Phishing Attacks",
    description: "Attackers send fraudulent emails pretending to be from reputable sources. The goal is to steal sensitive data like passwords or credit card numbers.",
    severity: "High",
    source: "Social Engineering",
    date: new Date()
  },
  {
    title: "Ransomware",
    description: "Malware that encrypts your files and demands payment for the decryption key. Attackers often threaten to delete or leak data if not paid.",
    severity: "Critical",
    source: "Malware",
    date: new Date()
  },
  {
    title: "DDoS Attack",
    description: "Distributed Denial-of-Service attacks overwhelm a target server with fake traffic, causing it to crash and denying access to legitimate users.",
    severity: "High",
    source: "Network Attack",
    date: new Date()
  },
  {
    title: "SQL Injection (SQLi)",
    description: "Attackers insert malicious code into database queries via input fields. This allows them to view, modify, or delete protected database data.",
    severity: "Critical",
    source: "Vulnerability Exploit",
    date: new Date()
  },
  {
    title: "Man-in-the-Middle (MitM)",
    description: "Attackers secretly intercept communications between two parties. Common on public Wi-Fi, allowing them to eavesdrop on private data.",
    severity: "Medium",
    source: "Network Interception",
    date: new Date()
  },
  {
    title: "Credential Stuffing",
    description: "Automated attacks that use stolen usernames and passwords to gain unauthorized access to user accounts across multiple sites.",
    severity: "Medium",
    source: "Auth Breach",
    date: new Date()
  }
];

exports.getThreats = async (req, res) => {
  try {
    const threatCount = await Threat.countDocuments();

    // If DB is not exactly what we expect, reset it
    if (threatCount !== COMMON_THREATS.length) {
      console.log("⚠️ Resetting threats collection...");
      await Threat.deleteMany({});
      await Threat.insertMany(COMMON_THREATS);
    }

    const threats = await Threat.find().sort({ date: -1 });
    res.json(threats);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Keep createThreat for Admin usage in Postman if needed
exports.createThreat = async (req, res) => {
  try {
    const newThreat = new Threat(req.body);
    await newThreat.save();
    res.status(201).json(newThreat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};