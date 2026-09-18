import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password'; // In real app use hashed passwords

// Simple login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to protect routes
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

// Example protected route to get admin info
router.get('/info', verifyToken, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

export default router;
