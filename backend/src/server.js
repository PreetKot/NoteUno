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

// Initialize database connection
connectDB();

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    success: true, 
    message: "NoteUno Backend API is running!",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
}

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "production" ? "Something went wrong" : error.message
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Export for Vercel
export default app;
