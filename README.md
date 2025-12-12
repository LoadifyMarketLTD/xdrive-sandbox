# xdrive-sandbox

A full-stack logistics platform demo application built with React, Vite, and Express. This sandbox environment demonstrates modern web development practices including real-time tracking, proof of delivery, photo uploads, and API integration.

## Features

- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **Leaflet Maps** - Interactive route tracking with OpenStreetMap
- **Signature Capture** - Digital signature pad for proof of delivery
- **Photo Upload** - Drag-and-drop photo upload with preview
- **Express Backend** - RESTful API with file upload support
- **CI/CD** - GitHub Actions workflow for automated builds
A logistics marketplace demo application built with Vite, React, and Leaflet. This sandbox environment demonstrates modern web development practices including real-time map tracking, digital signatures, photo uploads, and full-stack features with a Node.js/Express backend.

## Features

### Frontend
- **Vite 5** - Fast build tool and development server
- **React 18** - Modern UI library
- **Leaflet Map** - Interactive map with route visualization (Manchester → London)
- **Signature Capture** - Digital signature pad for proof of delivery
- **Photo Upload** - Drag-and-drop photo upload with preview
- **Job Management** - Display and manage delivery jobs
- **Custom CSS** - Styled with modern CSS utilities

### Backend
- **Express Server** - RESTful API backend
- **File Uploads** - Multer-based signature and photo upload handling
- **Mock Database** - In-memory job storage for demo purposes
- **CORS Enabled** - Cross-origin resource sharing for development

### DevOps
- **CI/CD** - GitHub Actions workflows for automated testing and builds
- **Concurrent Development** - Run frontend and backend simultaneously

## Tech Stack

### Frontend
- React 18.2.0
- Vite 5.0.5
- Leaflet 1.9.4 & React-Leaflet 4.2.1
- Axios 1.6.2
- React-Signature-Canvas 1.0.6
- React-Dropzone 14.2.3

### Backend
- Express 4.18.2
- Multer 1.4.5 (file uploads)
- CORS 2.8.5
- Vite 5.0.0
- React 18.2.0
- React Leaflet 4.2.1 (OpenStreetMap tiles - no API keys required)
- React Signature Canvas 1.0.6
- React Dropzone 14.2.3
- Axios 1.4.0
- Custom CSS utilities

### Backend
- Node.js / Express 4.18.2
- Multer 1.4.5 (file uploads)
- CORS 2.8.5
- Nodemon 3.0.1 (development)

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
cd server
npm install
cd ..
```

3. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

### Running the Application

#### Option 1: Run Frontend and Backend Separately (Recommended for Development)

**Terminal 1 - Frontend (Vite):**
```bash
cd server
npm install
cd ..
```
Opens at [http://localhost:5173](http://localhost:5173)

### Running the Application
**Terminal 2 - Backend (Express):**
```bash
npm run start:server
# or with auto-reload:
npm run dev:server
```
Server runs on [http://localhost:4000](http://localhost:4000)

#### Option 2: Run Both Concurrently

```bash
npm run dev:full
```
This starts both the Vite frontend (port 5173) and Express backend (port 4000) simultaneously.

#### Option 1: Run frontend and backend separately

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run start:server
```

#### Option 2: Run both concurrently
```bash
npm run dev:full
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

#### Root Level
- `npm run dev` - Start Vite dev server (frontend only)
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run start:server` - Start Express backend server
- `npm run dev:server` - Start backend with nodemon (auto-reload)
- `npm run dev:full` - Run both frontend and backend concurrently

#### Server Level (cd server)
- `npm start` - Start Express server
- `npm run dev` - Start server with nodemon

## Testing the Application

### Manual Testing Steps

1. **Checkout and setup:**
   ```bash
   git checkout -b feat/full-ui-stack origin/main
   npm install
   cd server && npm install && cd ..
   ```

2. **Start the application:**
   ```bash
   npm run dev:full
   ```
   Or in separate terminals:
   ```bash
   # Terminal 1
   npm run dev
   
   # Terminal 2
   npm run start:server
   ```

3. **Verify functionality:**
   - Open http://localhost:5173
   - **Live Tracking**: Verify the map renders with markers and a polyline route from Manchester → Birmingham → London
   - **Jobs List**: Verify the jobs list displays on the left side
   - **Proof of Delivery**:
     - Click "Proof of Delivery" on any job card
     - Draw a signature in the signature pad
     - Click "Save Signature"
     - Upload a photo by dragging/dropping or clicking to select
     - Click "Submit POD"
     - Verify signature is saved to `server/uploads/signatures/`
     - Verify photo is saved to `server/uploads/photos/`
   - **API Integration**: Jobs list should load from GET /api/jobs when server is running

4. **Fallback mode**: Stop the backend server and refresh the page - the app should show a warning banner and use mock data.
#### Frontend Scripts
- `npm run dev` - Start Vite development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

#### Backend Scripts
- `npm run start:server` - Start Express server (port 4000)
- `npm run dev:server` - Start Express server with nodemon (auto-reload)

#### Combined Scripts
- `npm run dev:full` - Run both frontend and backend concurrently

## Testing Features

### 1. Map Visualization
1. Start the frontend: `npm run dev`
2. Open [http://localhost:5173](http://localhost:5173)
3. You should see an interactive map showing a route from Manchester to London with markers in the "Live Tracking" section

### 2. Jobs List
1. Start the backend: `npm run start:server`
2. Start the frontend: `npm run dev`
3. Open [http://localhost:5173](http://localhost:5173)
4. Scroll to the "Active Jobs" section
5. You should see job cards loaded from the backend API

### 3. Signature Upload
1. Ensure both frontend and backend are running
2. Click the "Open Proof of Delivery" button
3. In the modal, draw a signature in the signature pad
4. Click "Save Signature"
5. Check `server/uploads/signatures/` directory - the signature image should be saved there
6. You should see a success message

### 4. Photo Upload
1. Ensure both frontend and backend are running
2. Click the "Open Proof of Delivery" button
3. In the modal, scroll to the "Photo Upload" section
4. Drag and drop an image file or click to select one
5. Check `server/uploads/photos/` directory - the photo should be saved there
6. You should see a preview and success message

### 5. Backend API Testing

You can test the backend API directly using curl or tools like Postman:

**Get Jobs:**
```bash
curl http://localhost:4000/api/jobs
```

**Create Job:**
```bash
curl -X POST http://localhost:4000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Delivery","collection":"Bristol","delivery":"Cardiff","driver":"Test Driver"}'
```

**Health Check:**
```bash
curl http://localhost:4000/health
```

## Project Structure

```
xdrive-sandbox/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── nodejs.yml
├── src/
│   ├── components/
│   │   ├── JobCard.jsx
│   │   ├── MapRoute.jsx
│   │   ├── SignaturePad.jsx
│   │   └── PhotoUpload.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── server/
│   ├── uploads/
│   │   ├── signatures/
│   │   └── photos/
│   ├── index.js
│   └── package.json
├── index.html
├── vite.config.js
│   ├── workflows/
│   │   ├── ci.yml          # Main CI workflow
│   │   └── nodejs.yml      # Node.js CI workflow
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
├── src/                    # Vite source directory
│   ├── components/
│   │   ├── MapRoute.jsx    # Leaflet map with route visualization
│   │   ├── SignaturePad.jsx # Signature capture component
│   │   ├── PhotoUpload.jsx # Photo upload component
│   │   └── JobCard.jsx     # Job display card
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── styles.css         # Global styles
├── server/                # Backend Express server
│   ├── index.js          # Express app with API endpoints
│   ├── package.json      # Server dependencies
│   └── uploads/          # Upload directory (gitignored)
│       ├── signatures/   # Saved signatures
│       └── photos/       # Saved photos
├── public/
│   └── leaflet/          # Leaflet marker icons
├── .gitignore
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
├── package.json
└── README.md
```

## API Endpoints

### Backend Server (http://localhost:3001)

- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create a new job
- `POST /api/upload/signature` - Upload signature as base64 PNG
- `POST /api/upload/photo` - Upload photo file (multipart/form-data)
- `GET /api/health` - Health check endpoint
### Express Backend API (Port 4000)

**Job Management:**
- `GET /api/jobs` - Get all jobs
  - Returns: `{ success: true, jobs: [...], count: number }`
- `POST /api/jobs` - Create a new job
  - Body: `{ title, collection, delivery, driver? }`
  - Returns: `{ success: true, job: {...} }`

**File Uploads:**
- `POST /api/upload/signature` - Upload signature (base64)
  - Body: `{ signature: "data:image/png;base64,...", jobId? }`
  - Returns: `{ success: true, filename, path }`
- `POST /api/upload/photo` - Upload photo (multipart/form-data)
  - Form field: `photo` (file)
  - Optional field: `jobId`
  - Returns: `{ success: true, filename, path, size, jobId }`

**Utility:**
- `GET /health` - Server health check
  - Returns: `{ status: "ok", timestamp }`
- `GET /uploads/*` - Serve uploaded files statically

## Environment Variables

No environment variables or API keys are required for this demo. All services use:
- OpenStreetMap tiles (no API key needed)
- Local file storage for uploads
- In-memory mock database

## Troubleshooting

### Backend server not connecting
- Ensure the server is running: `npm run start:server`
- Check if port 4000 is available
- Verify the server console shows "✅ XDrive backend server running"

### Map not loading
- Check browser console for errors
- Ensure leaflet CSS is imported
- Verify internet connection (OpenStreetMap tiles require internet)

### Uploads not saving
- Check that `server/uploads/signatures` and `server/uploads/photos` directories exist
- Verify backend server has write permissions
- Check server console for error messages

### CORS errors
- Ensure frontend is on port 5173 and backend on port 4000
- If using different ports, update CORS configuration in `server/index.js`

### Vite not starting
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure you have Node.js 18.x or higher installed

**Issue**: Map tiles not loading
- Check your internet connection (tiles are loaded from OpenStreetMap)

**Issue**: File uploads failing
- Ensure the server is running on port 3001
- Check that the `server/uploads/` directory exists

- [ ] Code follows the project's coding standards
- [ ] All tests pass (`npm run build` succeeds)
- [ ] Backend server starts successfully (`npm run start:server`)
- [ ] New features include appropriate documentation
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up to date with the base branch
- [ ] No unrelated changes are included
- [ ] No secrets or API keys are committed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
