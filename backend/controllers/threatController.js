const Threat = require('../models/Threat');
const axios = require('axios'); // ✅ Import Axios

// Get all threats (Fetches LIVE data from CIRCL.LU if DB is empty or old)
exports.getThreats = async (req, res) => {
  try {
    // 1. Check if we have recent data (e.g., in the last 24 hours)
    const latestThreat = await Threat.findOne().sort({ date: -1 });
    const isStale = !latestThreat || (new Date() - new Date(latestThreat.date)) > 24 * 60 * 60 * 1000;

    // 2. If data is missing or old, Fetch LIVE from External API
    if (isStale) {
        console.log("🔄 Fetching Live Threat Intelligence...");
        
        try {
            // Fetch from CIRCL.LU (Free Open Source CVE Feed)
            const response = await axios.get('https://cve.circl.lu/api/last');
            
            // The API returns a huge list; we take the top 10 most recent ones
            const liveData = response.data.slice(0, 10).map(item => ({
                // Map API "id" (e.g., CVE-2024-1234) to our "title"
                title: item.id, 
                // Map API "summary" to "description", limited to 200 chars
                description: item.summary.length > 200 ? item.summary.substring(0, 200) + "..." : item.summary,
                // Default fields since this API doesn't provide severity/source
                severity: "High", 
                source: "Official CVE Feed",
                date: new Date(item.Published)
            }));

            // Clear the old database entries and insert the new live data
            await Threat.deleteMany({});
            await Threat.insertMany(liveData);
            console.log("✅ Database updated with Live Intel.");

        } catch (apiError) {
            console.error("⚠️ External API failed, serving existing backup data:", apiError.message);
            // If the API fails, the code will skip the update and just return what is currently in the DB.
        }
    }

    // 3. Return the threats from our DB to the Frontend
    const threats = await Threat.find().sort({ date: -1 });
    res.json(threats);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new threat (Admin usage only)
exports.createThreat = async (req, res) => {
  try {
    const newThreat = new Threat(req.body);
    await newThreat.save();
    res.status(201).json(newThreat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};