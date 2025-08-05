require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

// OpenAI API key should be set in .env file
// Example: OPENAI_API_KEY=your_key_here
if (!process.env.OPENAI_API_KEY) {
  console.warn('  OpenAI API Key not found in environment variables');
  console.warn(' Please create .env file with: OPENAI_API_KEY=your_key_here');
}

console.log(' Checking OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Found (' + process.env.OPENAI_API_KEY.substring(0, 20) + '...)' : 'Not found');

// Import WhatsApp Web Controller
const whatsappWebController = require('./src/controllers/whatsappWebController');

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Bot control endpoints
app.get('/api/bot/status', async (req, res) => {
  try {
    const status = await whatsappWebController.getBotStatus();
    res.json({ success: true, status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/bot/start', async (req, res) => {
  try {
    await whatsappWebController.startBot();
    res.json({ success: true, message: 'Bot started successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/bot/stop', async (req, res) => {
  try {
    await whatsappWebController.stopBot();
    res.json({ success: true, message: 'Bot stopped successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/bot/restart', async (req, res) => {
  try {
    await whatsappWebController.restartBot();
    res.json({ success: true, message: 'Bot restarted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Chat route
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Control route
app.get('/control', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'control.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log( Server running on http://localhost:+PORT);
  console.log( Chat interface: http://localhost:+PORT+/chat);
  console.log(  Control panel: http://localhost:+PORT+/control);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log(' Received SIGTERM, shutting down gracefully...');
  await whatsappWebController.stopBot();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log(' Received SIGINT, shutting down gracefully...');
  await whatsappWebController.stopBot();
  process.exit(0);
});

module.exports = app;
