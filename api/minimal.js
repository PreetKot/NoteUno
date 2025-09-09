// Minimal test function
module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Function started');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    
    return res.status(200).json({
      message: 'Minimal function working!',
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString(),
      env: {
        NODE_ENV: process.env.NODE_ENV || 'undefined',
        MONGO_URI: process.env.MONGO_URI ? 'SET' : 'NOT SET',
        JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET',
        FRONTEND_URL: process.env.FRONTEND_URL || 'undefined'
      }
    });
    
  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({
      error: 'Function error',
      message: error.message,
      stack: error.stack
    });
  }
};
