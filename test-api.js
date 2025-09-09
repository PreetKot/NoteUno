const handler = require('./api/index.js');

// Test the serverless function locally
const testAPI = async () => {
  console.log('Testing serverless API function...');
  
  // Test health check
  const healthReq = {
    method: 'GET',
    url: '/api/health',
    headers: {}
  };
  
  const healthRes = {
    status: (code) => ({
      json: (data) => console.log('Health check:', code, data)
    })
  };
  
  try {
    await handler(healthReq, healthRes);
  } catch (error) {
    console.error('Health check error:', error);
  }
};

testAPI();
