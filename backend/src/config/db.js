import mongoose from "mongoose";

// Track connection state
let isConnected = false;

export const connectDB = async () => {
  // If already connected, don't reconnect
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    // Close any existing connections
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    isConnected = true;
    console.log(`MONGODB CONNECTED: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MONGODB", error);
    isConnected = false;
    
    // In serverless, don't exit the process
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    } else {
      throw error; // Let the serverless function handle the error
    }
  }
};
