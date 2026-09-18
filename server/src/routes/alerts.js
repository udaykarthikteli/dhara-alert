import express from 'express';
import webpush from 'web-push';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Load or generate VAPID keys
let vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};
if (!vapidKeys.publicKey || !vapidKeys.privateKey) {
  vapidKeys = webpush.generateVAPIDKeys();
  console.log('Generated VAPID keys');
}
webpush.setVapidDetails('mailto:admin@example.com', vapidKeys.publicKey, vapidKeys.privateKey);

// Store subscriptions in a JSON file (simple persistence)
const subsFile = path.resolve('subscriptions.json');
let subscriptions = [];
if (fs.existsSync(subsFile)) {
  try { subscriptions = JSON.parse(fs.readFileSync(subsFile, 'utf-8')); } catch (_) { subscriptions = []; }
}

function saveSubs() {
  fs.writeFileSync(subsFile, JSON.stringify(subscriptions, null, 2));
}

// Subscribe endpoint
router.post('/subscribe', (req, res) => {
  const sub = req.body;
  if (!sub || !sub.endpoint) {
    return res.status(400).json({ error: 'Invalid subscription' });
  }
  // Avoid duplicates
  if (!subscriptions.find(s => s.endpoint === sub.endpoint)) {
    subscriptions.push(sub);
    saveSubs();
  }
  res.status(201).json({ success: true });
});

// Test push notification (protected by admin JWT)
import jwt from 'jsonwebtoken';
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.post('/test', verifyToken, async (req, res) => {
  const payload = JSON.stringify({ title: 'Test Alert', body: 'This is a test push notification.' });
  const results = [];
  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
      results.push({ endpoint: sub.endpoint, status: 'sent' });
    } catch (err) {
      results.push({ endpoint: sub.endpoint, status: 'failed', error: err.message });
    }
  }
  res.json({ results, publicKey: vapidKeys.publicKey });
});

// Provide public VAPID key for client to subscribe
router.get('/vapidPublicKey', (req, res) => {
  res.json({ publicKey: vapidKeys.publicKey });
});

export default router;
