const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path'); 

// ✅ Import Only Necessary Routes
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require("./routes/complaintRoutes");
const postRoutes = require("./routes/postRoutes");
const actionLogRoutes = require('./routes/actionLogRoutes');

const app = express();
const PORT = 5000; 

// Middleware
app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.json());

// ✅ SERVE STATIC FILES
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Active Routes
app.use('/api/users', userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/logs', actionLogRoutes);

app.get('/', (req, res) => res.json({ message: 'Welcome to CyberConnect' }));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    connectDB();
});