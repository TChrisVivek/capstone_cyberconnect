const express = require('express');
const cors = require('cors'); // 1. Import cors
const connectDB = require('./config/db');

// 2. Import your Routes
const userRoutes = require('./routes/userRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const threatRoutes = require('./routes/threatRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// 3. CHANGE PORT TO 5000 (Your frontend api.js expects port 5000)
const PORT = 5000; 

// 4. Middleware (Critical!)
app.use(cors({ 
  origin: 'http://localhost:5173', // Allow your frontend to connect
  credentials: true 
}));
app.use(express.json()); // Allows the server to read JSON data from forms

// Test Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to CyberConnect' });
});

// 5. Mount the Routes
app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/threats', threatRoutes);
app.use('/api/verifications', verificationRoutes);
app.use("/api/complaints", complaintRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    connectDB();
});