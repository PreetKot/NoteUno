const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// MongoDB Models (inline to avoid import issues)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attachments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    uploadDate: { type: Date, default: Date.now }
  }],
  isFavorite: { type: Boolean, default: false },
}, { timestamps: true });

// Create models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

// Database connection
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  
  try {
    if (mongoose.connections[0].readyState) {
      isConnected = true;
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// JWT helper
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "fallback-secret", {
    expiresIn: "30d",
  });
};

// Auth middleware
const authMiddleware = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret");
  const user = await User.findById(decoded.userId).select("-password");
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};

// Main serverless function
module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://note-uno.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();

    const { method, url } = req;
    const path = url.replace('/api', '');

    // Health check
    if (method === 'GET' && path === '/health') {
      return res.json({ 
        status: 'OK', 
        message: 'NoteUno API is running',
        timestamp: new Date().toISOString()
      });
    }

    // Auth routes
    if (method === 'POST' && path === '/auth/signup') {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({ name, email, password: hashedPassword });
      const token = generateToken(user._id);

      return res.status(201).json({
        message: 'User created successfully',
        user: { id: user._id, name: user.name, email: user.email },
        token
      });
    }

    if (method === 'POST' && path === '/auth/signin') {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user._id);
      return res.json({
        message: 'Login successful',
        user: { id: user._id, name: user.name, email: user.email },
        token
      });
    }

    // Protected routes (require authentication)
    let user;
    try {
      user = await authMiddleware(req);
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Notes routes
    if (method === 'GET' && path === '/notes') {
      const notes = await Note.find({ user: user._id }).sort({ createdAt: -1 });
      return res.json(notes);
    }

    if (method === 'POST' && path === '/notes') {
      const { title, content } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const note = await Note.create({
        title,
        content,
        user: user._id,
        attachments: []
      });

      return res.status(201).json(note);
    }

    // Default 404
    return res.status(404).json({ error: 'Route not found', path });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};
