const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Create uploads directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads')
const signaturesDir = path.join(uploadsDir, 'signatures')
const photosDir = path.join(uploadsDir, 'photos')

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}
if (!fs.existsSync(signaturesDir)) {
  fs.mkdirSync(signaturesDir)
}
if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir)
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir))

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, photosDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

// In-memory storage for jobs (in production, use a database)
let jobs = [
  {
    id: '1',
    title: 'Delivery Job 1',
    origin: 'Manchester',
    destination: 'London',
    status: 'In Transit'
  }
]

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs)
})

// Create a new job
app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: req.body.id || Date.now().toString(),
    title: req.body.title || 'New Job',
    origin: req.body.origin || 'Origin',
    destination: req.body.destination || 'Destination',
    status: req.body.status || 'Pending'
  }
  
  jobs.push(newJob)
  res.status(201).json(newJob)
})

// Upload signature (base64 image)
// NOTE: In production, implement rate limiting (e.g., express-rate-limit) to prevent abuse
app.post('/api/upload/signature', (req, res) => {
  try {
    const { image, jobId } = req.body
    
    if (!image) {
      return res.status(400).json({ error: 'No signature image provided' })
    }
    
    // Extract base64 data
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    // Generate filename
    const filename = `signature-${jobId || Date.now()}.png`
    const filepath = path.join(signaturesDir, filename)
    
    // Save file
    fs.writeFileSync(filepath, buffer)
    
    res.json({ 
      success: true, 
      url: `/uploads/signatures/${filename}`,
      message: 'Signature uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading signature:', error)
    res.status(500).json({ error: 'Failed to upload signature' })
  }
})

// Upload photo (multipart form data)
// NOTE: In production, implement rate limiting (e.g., express-rate-limit) to prevent abuse
app.post('/api/upload/photo', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No photo provided' })
    }
    
    res.json({
      success: true,
      url: `/uploads/photos/${req.file.filename}`,
      filename: req.file.filename,
      message: 'Photo uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading photo:', error)
    res.status(500).json({ error: 'Failed to upload photo' })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message || 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ Uploads directory: ${uploadsDir}`)
})
