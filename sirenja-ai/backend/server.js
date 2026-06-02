'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');

const generateRouter = require('./routes/generate');
const previewRouter = require('./routes/preview');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure output directory exists
const outputDir = path.join(__dirname, '../output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`[STARTUP] Output directory created: ${outputDir}`);
}

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// File upload middleware
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 10 * 1024 * 1024 },
  abortOnLimit: true
}));

// Rate limiter for generate endpoint
const generateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: 'Terlalu banyak permintaan generate. Silakan tunggu 1 menit sebelum mencoba lagi.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/generate', generateLimiter);

// Static files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api', generateRouter);
app.use('/api', previewRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'SiRENJA-AI',
    kabupaten: process.env.KABUPATEN || 'Aceh Tenggara'
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 404 handler
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ success: false, error: `Endpoint ${req.path} tidak ditemukan` });
  } else {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  }
});

// Global error handler
app.use((err, req, res, next) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR: ${err.message}`);
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Terjadi kesalahan internal server'
  });
});

app.listen(PORT, () => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] SiRENJA-AI server berjalan di port ${PORT}`);
  console.log(`[${timestamp}] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[${timestamp}] Output directory: ${outputDir}`);
  console.log(`[${timestamp}] Frontend: http://localhost:${PORT}`);
});

module.exports = app;
