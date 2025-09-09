import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from '../backend/src/routes/notesRoutes.js';
import authRoutes from '../backend/src/routes/authRoutes.js';
import { connectDB } from '../backend/src/config/db.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL || "https://noteuno.vercel.app"],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

export default app;
