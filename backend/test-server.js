import express from "express";
import cors from "cors";

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.json({ 
    success: true, 
    message: "NoteUno Backend is running!",
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      hasMongoUri: !!process.env.MONGO_URI,
      hasJwtSecret: !!process.env.JWT_SECRET
    }
  });
});

// Simple API test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Export for Vercel
export default app;
