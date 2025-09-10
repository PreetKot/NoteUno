import express from "express";
import cors from "cors";

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Diagnostic endpoint
app.get("/", (req, res) => {
  try {
    const diagnostics = {
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV || 'undefined',
        hasMongoUri: !!process.env.MONGO_URI,
        hasJwtSecret: !!process.env.JWT_SECRET,
        mongoUriLength: process.env.MONGO_URI ? process.env.MONGO_URI.length : 0,
        jwtSecretLength: process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0
      },
      runtime: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch
      }
    };
    
    res.json(diagnostics);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

// Test database connection without importing models
app.get("/test-db", async (req, res) => {
  try {
    const mongoose = await import("mongoose");
    
    if (!process.env.MONGO_URI) {
      return res.status(500).json({
        success: false,
        error: "MONGO_URI environment variable is not set"
      });
    }
    
    await mongoose.default.connect(process.env.MONGO_URI);
    
    res.json({
      success: true,
      message: "Database connected successfully",
      connectionState: mongoose.default.connection.readyState
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      mongoUri: process.env.MONGO_URI ? "Present" : "Missing"
    });
  }
});

export default app;
