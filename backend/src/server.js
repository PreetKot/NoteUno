import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174"],
    })
  );
} else {
  app.use(
    cors({
      origin: [process.env.FRONTEND_URL || "https://noteuno.vercel.app"],
      credentials: true,
    })
  );
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// For local development
if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("Server started on PORT:", PORT);
    });
  }).catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}

// For Vercel serverless - connect to DB on each request
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  try {
    await connectDB();
    isConnected = true;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

// Middleware to ensure DB connection for serverless
app.use(async (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    try {
      await connectToDatabase();
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Database connection failed",
        error: error.message 
      });
    }
  }
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    success: true, 
    message: "NoteUno Backend API is running!",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel
export default app;
