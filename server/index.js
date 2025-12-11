const express = require('express')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3001

// Ensure upload directories exist
const uploadsDir = path.join(__dirname, 'uploads')
const signaturesDir = path.join(uploadsDir, 'signatures')
const photosDir = path.join(uploadsDir, 'photos')

;[uploadsDir, signaturesDir, photosDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`Created directory: ${dir}`)
  }
})

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Configure multer for photo uploads
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, photosDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: photoStorage })

// Mock jobs data
const mockJobs = [
  {
    id: 1,
    title: 'Delivery to Birmingham',
    status: 'In Progress',
    pickup: 'Manchester',
    delivery: 'Birmingham',
    distance: '88 miles'
  },
  {
    id: 2,
    title: 'Delivery to London',
    status: 'Pending',
    pickup: 'Birmingham',
    delivery: 'London',
    distance: '110 miles'
  },
  {
    id: 3,
    title: 'Return to Manchester',
    status: 'Scheduled',
    pickup: 'London',
    delivery: 'Manchester',
    distance: '200 miles'
  }
]

// API Routes

// GET /api/jobs - Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json(mockJobs)
})

// POST /api/jobs - Create new job
app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: mockJobs.length + 1,
    ...req.body
  }
  mockJobs.push(newJob)
  res.status(201).json(newJob)
})

// POST /api/upload/signature - Upload signature as base64
app.post('/api/upload/signature', (req, res) => {
  try {
    const { image } = req.body
    
    if (!image) {
      return res.status(400).json({ error: 'No image data provided' })
    }

    // Extract base64 data (remove data:image/png;base64, prefix if present)
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    // Generate unique filename
    const filename = `signature-${Date.now()}.png`
    const filepath = path.join(signaturesDir, filename)
    
    // Save file
    fs.writeFileSync(filepath, buffer)
    
    res.json({
      success: true,
      filename,
      path: `/uploads/signatures/${filename}`
    })
  } catch (error) {
    console.error('Signature upload error:', error)
    res.status(500).json({ error: 'Failed to save signature' })
  }
})

// POST /api/upload/photo - Upload photo using multer
app.post('/api/upload/photo', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No photo uploaded' })
    }

    res.json({
      success: true,
      filename: req.file.filename,
      path: `/uploads/photos/${req.file.filename}`,
      size: req.file.size
    })
  } catch (error) {
    console.error('Photo upload error:', error)
    res.status(500).json({ error: 'Failed to save photo' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ Upload directories ready:`)
  console.log(`  - Signatures: ${signaturesDir}`)
  console.log(`  - Photos: ${photosDir}`)
})
