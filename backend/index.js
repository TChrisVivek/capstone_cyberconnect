const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ✅ Added this to read your .env file
const connectDB = require('./config/db');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const threatRoutes = require('./routes/threatRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const complaintRoutes = require("./routes/complaintRoutes");
const postRoutes = require("./routes/postRoutes"); // ✅ Community Posts Route

const app = express();
const PORT = 5000; 

// Middleware
app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to CyberConnect' });
});

// Mount the Routes
app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/threats', threatRoutes);
app.use('/api/verifications', verificationRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/posts", postRoutes); // ✅ This fixes the Community Page 404 error

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    connectDB();
});