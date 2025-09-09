import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from '../backend/src/routes/notesRoutes.js';
import authRoutes from '../backend/src/routes/authRoutes.js';
import { connectDB } from '../backend/src/config/db.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to database on cold start
let isConnected = false;
const connectToDatabase = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
};

// Middleware
app.use(cors({
  origin: true, // Allow all origins for now
  credentials: true,
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Routes - Note: Vercel already adds /api prefix, so we don't need it in routes
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Vercel serverless function handler
export default async function handler(req, res) {
  await connectToDatabase();
  return app(req, res);
}
