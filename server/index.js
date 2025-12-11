const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 3001

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
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
      cb(new Error('Only image files are allowed!'))
    }
  }
})

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'XDrive Mock Server is running',
    timestamp: new Date().toISOString()
  })
})

// Photo upload endpoint
app.post('/api/upload', upload.array('photos', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }

    const files = req.files.map(file => file.filename)
    console.log('Files uploaded:', files)

    res.json({ 
      success: true, 
      message: `${files.length} file(s) uploaded successfully`,
      files: files
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// Signature endpoint
app.post('/api/signature', (req, res) => {
  try {
    const { signature } = req.body
    
    if (!signature) {
      return res.status(400).json({ error: 'No signature data provided' })
    }

    // In a real application, you would save this to a database
    // For now, we'll just acknowledge receipt
    console.log('Signature received:', signature.substring(0, 50) + '...')

    res.json({ 
      success: true, 
      message: 'Signature saved successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Signature save error:', error)
    res.status(500).json({ error: 'Failed to save signature' })
  }
})

// Mock delivery data endpoint
app.get('/api/deliveries', (req, res) => {
  res.json({
    deliveries: [
      {
        id: 1,
        location: { lat: 51.505, lng: -0.09 },
        address: 'London, UK',
        status: 'pending'
      },
      {
        id: 2,
        location: { lat: 51.515, lng: -0.1 },
        address: 'Westminster, London',
        status: 'completed'
      }
    ]
  })
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error)
  res.status(500).json({ 
    error: error.message || 'Internal server error' 
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`)
  console.log(`📁 Uploads directory: ${uploadsDir}`)
})
