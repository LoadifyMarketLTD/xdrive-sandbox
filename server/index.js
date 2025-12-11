const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Create upload directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads');
const signaturesDir = path.join(uploadsDir, 'signatures');
const photosDir = path.join(uploadsDir, 'photos');

[uploadsDir, signaturesDir, photosDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, photosDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: 'Delivery to Birmingham',
    customer: 'ABC Corp',
    status: 'In Progress',
    destination: 'Birmingham, UK',
  },
  {
    id: 2,
    title: 'Pickup from Manchester',
    customer: 'XYZ Ltd',
    status: 'Pending',
    destination: 'Manchester, UK',
  },
  {
    id: 3,
    title: 'Express to London',
    customer: 'Quick Logistics',
    status: 'Completed',
    destination: 'London, UK',
  },
];

let jobs = [...mockJobs];

// Routes

// GET /api/jobs - Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// POST /api/jobs - Create a new job
app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: jobs.length + 1,
    ...req.body,
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// POST /api/upload/signature - Upload signature as base64
app.post('/api/upload/signature', (req, res) => {
  try {
    const { image, jobId } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No signature image provided' });
    }

    // Remove data URL prefix if present
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate filename
    const filename = `signature-${jobId || 'unknown'}-${Date.now()}.png`;
    const filepath = path.join(signaturesDir, filename);

    // Save file
    fs.writeFileSync(filepath, buffer);

    res.json({
      success: true,
      filename,
      path: `/uploads/signatures/${filename}`,
    });
  } catch (error) {
    console.error('Error saving signature:', error);
    res.status(500).json({ error: 'Failed to save signature' });
  }
});

// POST /api/upload/photo - Upload photo file
app.post('/api/upload/photo', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No photo file provided' });
    }

    res.json({
      success: true,
      filename: req.file.filename,
      path: `/uploads/photos/${req.file.filename}`,
      jobId: req.body.jobId,
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`XDrive server running on http://localhost:${PORT}`);
  console.log(`Upload directories created at ${uploadsDir}`);
});
