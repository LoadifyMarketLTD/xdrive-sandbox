const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 uploads per windowMs
  message: 'Too many upload requests from this IP, please try again later.',
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // For base64 signatures
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Apply rate limiting to all routes
app.use(limiter);

// Ensure upload directories exist
const uploadDirs = [
  path.join(__dirname, 'uploads', 'signatures'),
  path.join(__dirname, 'uploads', 'photos')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Multer configuration for photo uploads
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads', 'photos'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadPhoto = multer({ 
  storage: photoStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Mock jobs database
let jobs = [
  {
    id: 1,
    title: 'Manchester to London Delivery',
    status: 'in_transit',
    collection: 'Manchester',
    delivery: 'London',
    date: new Date().toISOString(),
    driver: 'John Smith'
  },
  {
    id: 2,
    title: 'Birmingham to Edinburgh',
    status: 'pending',
    collection: 'Birmingham',
    delivery: 'Edinburgh',
    date: new Date().toISOString(),
    driver: 'Jane Doe'
  }
];

// Counter for generating unique job IDs
let nextJobId = 3;

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json({
    success: true,
    jobs: jobs,
    count: jobs.length
  });
});

// Create a new job
app.post('/api/jobs', (req, res) => {
  const { title, collection, delivery, driver } = req.body;
  
  if (!title || !collection || !delivery) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: title, collection, delivery'
    });
  }

  const newJob = {
    id: nextJobId++,
    title,
    status: 'pending',
    collection,
    delivery,
    date: new Date().toISOString(),
    driver: driver || 'Unassigned'
  };

  jobs.push(newJob);

  res.status(201).json({
    success: true,
    job: newJob
  });
});

// Upload signature (accepts base64 or file)
app.post('/api/upload/signature', uploadLimiter, (req, res) => {
  try {
    const { signature, jobId } = req.body;
    
    if (!signature) {
      return res.status(400).json({
        success: false,
        error: 'No signature data provided'
      });
    }

    // Handle base64 signature
    let base64Data = signature;
    
    // Remove data URL prefix if present
    if (base64Data.includes('base64,')) {
      base64Data = base64Data.split('base64,')[1];
    }

    const fileName = `signature-${jobId || Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
    const filePath = path.join(__dirname, 'uploads', 'signatures', fileName);

    // Save base64 to file
    fs.writeFileSync(filePath, base64Data, 'base64');

    res.json({
      success: true,
      message: 'Signature uploaded successfully',
      filename: fileName,
      path: `/uploads/signatures/${fileName}`
    });
  } catch (error) {
    console.error('Signature upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload signature',
      details: error.message
    });
  }
});

// Upload photo (multipart file)
app.post('/api/upload/photo', uploadLimiter, uploadPhoto.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No photo file provided'
      });
    }

    const { jobId } = req.body;

    res.json({
      success: true,
      message: 'Photo uploaded successfully',
      filename: req.file.filename,
      path: `/uploads/photos/${req.file.filename}`,
      size: req.file.size,
      jobId: jobId || null
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload photo',
      details: error.message
    });
  }
});

// Serve uploaded files statically (for testing/viewing)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ XDrive backend server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads saved to: ${path.join(__dirname, 'uploads')}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET  /health`);
  console.log(`  GET  /api/jobs`);
  console.log(`  POST /api/jobs`);
  console.log(`  POST /api/upload/signature`);
  console.log(`  POST /api/upload/photo`);
});

module.exports = app;
