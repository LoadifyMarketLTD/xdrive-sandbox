import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

// Ensure upload directories exist
const uploadsDir = join(__dirname, 'uploads')
const signaturesDir = join(uploadsDir, 'signatures')
const photosDir = join(uploadsDir, 'photos')

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}
if (!fs.existsSync(signaturesDir)) {
  fs.mkdirSync(signaturesDir, { recursive: true })
}
if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true })
}

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, photosDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'photo-' + uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

// Mock jobs data
let jobs = [
  { id: 1, from: 'Manchester', to: 'Birmingham', status: 'in-progress', description: 'Delivery in progress' },
  { id: 2, from: 'Birmingham', to: 'London', status: 'in-progress', description: 'En route to London' },
  { id: 3, from: 'Liverpool', to: 'Bristol', status: 'pending', description: 'Awaiting pickup' }
]

// GET /api/jobs - Return mock job list
app.get('/api/jobs', (req, res) => {
  res.json(jobs)
})

// POST /api/jobs - Accept job object and return new id
app.post('/api/jobs', (req, res) => {
  const newJob = req.body
  newJob.id = jobs.length + 1
  jobs.push(newJob)
  res.status(201).json({ id: newJob.id, message: 'Job created successfully', job: newJob })
})

// POST /api/upload/signature - Accept base64 image and save as PNG
app.post('/api/upload/signature', (req, res) => {
  try {
    const { image } = req.body
    
    if (!image) {
      return res.status(400).json({ error: 'No image data provided' })
    }

    // Generate unique filename
    const filename = `signature-${Date.now()}.png`
    const filepath = join(signaturesDir, filename)

    // Convert base64 to buffer and save
    const imageBuffer = Buffer.from(image, 'base64')
    fs.writeFileSync(filepath, imageBuffer)

    res.json({ 
      message: 'Signature saved successfully', 
      filename: filename,
      path: `/uploads/signatures/${filename}` 
    })
  } catch (error) {
    console.error('Error saving signature:', error)
    res.status(500).json({ error: 'Failed to save signature' })
  }
})

// POST /api/upload/photo - Accept multipart/form-data with field 'photo'
app.post('/api/upload/photo', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No photo uploaded' })
    }

    res.json({ 
      message: 'Photo uploaded successfully', 
      filename: req.file.filename,
      path: `/uploads/photos/${req.file.filename}`,
      size: req.file.size
    })
  } catch (error) {
    console.error('Error uploading photo:', error)
    res.status(500).json({ error: 'Failed to upload photo' })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Uploads directory: ${uploadsDir}`)
})
