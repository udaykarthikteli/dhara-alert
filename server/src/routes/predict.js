import express from 'express';
import * as tf from '@tensorflow/tfjs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Resolve model path relative to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const modelPath = path.join(__dirname, '..', '..', 'model', 'model.json');
let model;

(async () => {
  try {
    model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log('ML model loaded');
  } catch (e) {
    console.error('Failed to load model', e);
  }
})();

router.post('/', async (req, res) => {
  if (!model) {
    return res.status(503).json({ error: 'Model not loaded' });
  }
  const { rainfall, moisture } = req.body;
  if (rainfall === undefined || moisture === undefined) {
    return res.status(400).json({ error: 'rainfall and moisture required' });
  }
  // Simple model: input [rainfall, moisture]
  const input = tf.tensor2d([[parseFloat(rainfall), parseFloat(moisture)]]);
  const prediction = model.predict(input);
  const riskScore = (await prediction.data())[0];
  res.json({ riskScore: Number(riskScore.toFixed(2)) });
});

export default router;
