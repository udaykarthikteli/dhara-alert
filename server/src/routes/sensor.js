import express from 'express';
const router = express.Router();

// Simulate sensor data emission every 2 seconds
router.get('/stream', (req, res) => {
  const io = req.app.get('io');
  if (!io) {
    return res.status(500).json({ error: 'Socket.io not initialized' });
  }
  // Keep connection alive (Server Sent Events fallback)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  const sendData = () => {
    const data = {
      temperature: (Math.random() * 30 + 5).toFixed(1), // 5‑35°C
      rainfall: (Math.random() * 200).toFixed(1), // mm
      moisture: (Math.random() * 100).toFixed(1) // %
    };
    io.emit('sensor', data);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  const interval = setInterval(sendData, 2000);
  req.on('close', () => clearInterval(interval));
});

export default router;
