const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');

// ✅ Import Routes
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require("./routes/complaintRoutes");
const postRoutes = require("./routes/postRoutes");
const actionLogRoutes = require('./routes/actionLogRoutes');
const threatRoutes = require('./routes/threatRoutes');

const app = express();

// ✅ Use PORT from ENV
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow any origin for this capstone project so it works on localhost and Vercel
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// ✅ Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/logs', actionLogRoutes);
app.use('/api/threats', threatRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CyberConnect' });
});

// ✅ Connect DB BEFORE listen (best practice)
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
