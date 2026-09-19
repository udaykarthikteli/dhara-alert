import express from 'express';
// json2csv import removed (not needed)
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// In‑memory sample data (in real app use DB)
let sampleData = [
  { timestamp: new Date().toISOString(), temperature: 22.5, rainfall: 12.3, moisture: 45, riskScore: 34 },
  { timestamp: new Date().toISOString(), temperature: 24.1, rainfall: 0, moisture: 30, riskScore: 15 }
];

router.get('/csv', (req, res) => {
  const fields = ['timestamp', 'temperature', 'rainfall', 'moisture', 'riskScore'];
  const header = fields.join(',');
  const rows = sampleData.map(item => fields.map(f => item[f]).join(','));
  const csv = [header, ...rows].join('\n');
  res.header('Content-Type', 'text/csv');
  res.attachment('report.csv');
  res.send(csv);
});

router.get('/pdf', (req, res) => {
  const doc = new PDFDocument();
  const chunks = [];
  doc.on('data', chunk => chunks.push(chunk));
  doc.on('end', () => {
    const result = Buffer.concat(chunks);
    res.header('Content-Type', 'application/pdf');
    res.attachment('report.pdf');
    res.send(result);
  });
  doc.fontSize(18).text('Dhara Alert Report', { align: 'center' });
  doc.moveDown();
  sampleData.forEach(item => {
    doc.fontSize(12).text(`Time: ${item.timestamp}`);
    doc.text(`Temp: ${item.temperature}°C, Rainfall: ${item.rainfall}mm, Moisture: ${item.moisture}%, Risk: ${item.riskScore}`);
    doc.moveDown();
  });
  doc.end();
});

export default router;
