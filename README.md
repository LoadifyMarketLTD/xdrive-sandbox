# xdrive-sandbox

A logistics marketplace demo application featuring a full UI stack with map tracking, signature capture, photo uploads, and Express backend. Built with Vite, React, and Leaflet.

## Features

- **Live Tracking Map** - Interactive map showing delivery routes (Manchester → Birmingham → London)
- **Proof of Delivery** - Signature capture and photo upload functionality
- **Job Management** - Create and track delivery jobs
- **Express Backend** - REST API with file upload support
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **CI/CD** - GitHub Actions workflow for automated builds

## Tech Stack

### Frontend
- React 18.2.0
- Vite 5.x
- React Leaflet 4.2.1 (mapping)
- React Signature Canvas (signature capture)
- React Dropzone (photo uploads)
- Axios (HTTP client)

### Backend
- Express 4.x
- Multer (file uploads)
- CORS support

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LoadifyMarketLTD/xdrive-sandbox.git
cd xdrive-sandbox
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install server dependencies:
```bash
cd server
npm install
cd ..
```

### Running Locally

#### Option 1: Run frontend and backend separately

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run start:server
# Or for development with auto-restart:
npm run dev:server
```

#### Option 2: Run both concurrently (recommended)

```bash
npm run dev:full
```

The application will be available at:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3001](http://localhost:3001)

### Available Scripts

- `npm run dev` - Start Vite development server (frontend only)
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run start:server` - Start Express server
- `npm run dev:server` - Start Express server with nodemon (auto-restart)
- `npm run dev:full` - Run both frontend and backend concurrently
- `npm run lint` - Run ESLint

## Testing the Application

1. Open [http://localhost:5173](http://localhost:5173)
2. View the interactive map showing the Manchester → Birmingham → London route
3. Click "Add Sample Job" to create delivery jobs
4. Click "Complete POD" on any job to open the Proof of Delivery modal
5. Draw a signature in the signature pad
6. (Optional) Upload a photo by dragging/dropping or clicking the dropzone
7. Click "Submit POD" to save the signature and photo to the server
8. Check the `server/uploads/` directory to verify files were saved:
   - `server/uploads/signatures/` - Signature images
   - `server/uploads/photos/` - Uploaded photos

## Project Structure

```
xdrive-sandbox/
├── .github/
│   └── workflows/
│       └── nodejs.yml          # CI workflow
├── src/
│   ├── components/
│   │   ├── JobCard.jsx         # Job card display
│   │   ├── MapRoute.jsx        # Interactive map with route
│   │   ├── SignaturePad.jsx    # Signature capture
│   │   └── PhotoUpload.jsx     # Photo upload with preview
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # React entry point
│   └── styles.css              # Application styles
├── server/
│   ├── index.js                # Express server
│   ├── package.json            # Server dependencies
│   └── uploads/                # Uploaded files (gitignored)
│       ├── signatures/
│       └── photos/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Frontend dependencies
└── README.md
```

## API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create a new job

### File Uploads
- `POST /api/upload/signature` - Upload signature (JSON with base64 image)
  ```json
  { "image": "data:image/png;base64,...", "jobId": "123" }
  ```
- `POST /api/upload/photo` - Upload photo (multipart/form-data)
  - Field name: `photo`
  - Accepted formats: jpeg, jpg, png, gif
  - Max size: 5MB

### Health Check
- `GET /api/health` - Server health check

## Development Notes

- The frontend proxies API requests to `http://localhost:3001` (see `vite.config.js`)
- Uploads are stored in `server/uploads/` (gitignored)
- The map uses OpenStreetMap tiles (no API key required)
- Signature images are saved as base64-encoded PNG files
- Photo uploads support drag-and-drop or click-to-select

## Troubleshooting

**Issue**: Map tiles not loading
- Check your internet connection (tiles are loaded from OpenStreetMap)

**Issue**: File uploads failing
- Ensure the server is running on port 3001
- Check that the `server/uploads/` directory exists

**Issue**: CORS errors
- Verify both frontend (5173) and backend (3001) are running
- Check Vite proxy configuration in `vite.config.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
