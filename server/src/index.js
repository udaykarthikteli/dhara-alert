import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sensorRouter from './routes/sensor.js';
import predictRouter from './routes/predict.js';
import adminRouter from './routes/admin.js';
import alertsRouter from './routes/alerts.js';
import reportRouter from './routes/report.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(bodyParser.json());

// Make io accessible to routes
app.set('io', io);

app.use('/api/sensor', sensorRouter);
app.use('/api/predict', predictRouter);
app.use('/api/admin', adminRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/report', reportRouter);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
