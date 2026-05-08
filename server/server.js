const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDB() {
    if (isConnected || mongoose.connection.readyState === 1) return;
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/truecost';
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });
        isConnected = true;
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
    }
}

// MongoDB connection caching for Serverless Environment
app.use(async (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        await connectDB();
    }
    next();
});

// Routes
app.use('/api/auth', authRoutes);

if (process.env.VERCEL !== '1') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
        await connectDB();
    });
}

// Export the Express API for Vercel
module.exports = app;
