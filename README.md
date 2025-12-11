# xdrive-sandbox

A full-stack logistics marketplace demo application built with React (Vite), Express, and Bootstrap. This sandbox environment demonstrates modern web development practices including real-time map tracking, digital signatures, photo uploads, and RESTful API integration.

## Features

- **React 18 + Vite** - Fast, modern frontend development
- **Interactive Map** - Leaflet/OpenStreetMap integration showing route from Manchester → Birmingham → London
- **Digital Signatures** - Capture and save customer signatures using canvas
- **Photo Uploads** - Drag-and-drop photo upload with preview
- **Express Backend** - RESTful API with file upload handling
- **Bootstrap 5** - Responsive UI components
- **No API Keys Required** - Uses OpenStreetMap tiles (free)
- **CI/CD** - GitHub Actions workflow for automated testing and builds

## Tech Stack

### Frontend
- React 18.2.0
- Vite 5.0.8
- Bootstrap 5.3.2
- Leaflet + React-Leaflet 4.2.1
- React Signature Canvas 1.0.6
- React Dropzone 14.2.3
- Axios 1.6.2

### Backend
- Node.js + Express 4.18.2
- Multer (file uploads)
- CORS enabled

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm

### Installation

1. **Clone the repository and checkout the feature branch:**
```bash
git clone https://github.com/LoadifyMarketLTD/xdrive-sandbox.git
cd xdrive-sandbox
git checkout feat/full-ui-stack
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Install backend dependencies:**
```bash
cd server
npm install
cd ..
```

### Running the Application

#### Option 1: Run Frontend and Backend Together (Recommended)
```bash
npm run dev:full
```
This starts both the frontend (port 5173) and backend (port 3001) concurrently.

#### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Frontend runs on [http://localhost:5173](http://localhost:5173)

**Terminal 2 - Backend:**
```bash
npm run start:server
# or for development with auto-reload:
npm run dev:server
```
Backend API runs on [http://localhost:3001](http://localhost:3001)

### Available Scripts

#### Root Package
- `npm run dev` - Start Vite frontend development server (port 5173)
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build locally
- `npm run start:server` - Start backend server
- `npm run dev:server` - Start backend server with nodemon (auto-reload)
- `npm run dev:full` - Run frontend and backend concurrently

#### Server Package (cd server/)
- `npm start` - Start Express server
- `npm run dev` - Start server with nodemon (auto-reload)

## Testing the Application

1. **Navigate to** [http://localhost:5173](http://localhost:5173)

2. **Test Live Tracking:**
   - View the interactive map showing the route: Manchester → Birmingham → London
   - Map should display 3 markers and a blue polyline connecting them
   - Map automatically fits bounds to show all locations

3. **Test Proof of Delivery (POD):**
   - Click the "Complete Proof of Delivery" button
   - Modal opens with Signature and Photo Upload sections
   
4. **Test Signature Capture:**
   - Draw a signature on the canvas using mouse/touch
   - Click "Save Signature" - signature is saved as PNG to `server/uploads/signatures/`
   - Success message appears
   
5. **Test Photo Upload:**
   - Drag and drop an image, or click to select
   - Photo preview appears
   - File is uploaded to `server/uploads/photos/`
   - Success message appears
   
6. **Test Jobs API:**
   - Open browser console
   - Jobs list should load from `/api/jobs` endpoint
   - Verify 3 mock jobs are displayed

7. **Verify File Uploads:**
```bash
ls -la server/uploads/signatures/
ls -la server/uploads/photos/
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
│   │   ├── MapRoute.jsx         # Leaflet map with route visualization
│   │   ├── SignaturePad.jsx     # Signature capture component
│   │   ├── PhotoUpload.jsx      # Photo upload with drag-drop
│   │   └── JobCard.jsx          # Job display card
│   ├── App.jsx                  # Main app with POD modal
│   ├── main.jsx                 # React entry point
│   └── styles.css               # Custom styles
├── server/
│   ├── uploads/
│   │   ├── signatures/          # Saved signature PNGs
│   │   └── photos/              # Uploaded photos
│   ├── index.js                 # Express server with API endpoints
│   └── package.json             # Server dependencies
├── index.html                   # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Root dependencies
└── README.md
```

## API Endpoints

### Backend Server (http://localhost:3001)

- `GET /api/health` - Health check endpoint
- `GET /api/jobs` - Returns list of mock jobs
- `POST /api/jobs` - Create a new job (accepts JSON body)
- `POST /api/upload/signature` - Upload signature as base64 PNG
  - Request body: `{ "image": "base64-encoded-png-data" }`
  - Saves to: `server/uploads/signatures/`
- `POST /api/upload/photo` - Upload photo via multipart/form-data
  - Form field: `photo`
  - Saves to: `server/uploads/photos/`

## Features in Detail

### Live Map Tracking
- **Technology:** Leaflet + React-Leaflet with OpenStreetMap tiles
- **Route:** Manchester (collection) → Birmingham (waypoint) → London (delivery)
- **Features:** 
  - Three location markers
  - Blue polyline route
  - Auto-fit bounds to show all locations
  - Fully responsive design

### Proof of Delivery (POD)
- **Signature Capture:** 
  - Canvas-based drawing
  - Saves as PNG format
  - Base64 encoding for API transmission
  - Clear and save functionality
- **Photo Upload:**
  - Drag-and-drop interface
  - Image preview before upload
  - Supports JPEG, PNG, GIF
  - 5MB file size limit
  - Multipart form data upload

### Jobs Management
- View active jobs from API
- Graceful fallback to mock data if API unavailable
- Real-time status updates
- Card-based responsive layout

## Development Notes

- Frontend proxies `/api` requests to backend (configured in `vite.config.js`)
- Backend creates upload directories automatically on startup
- No authentication required (demo/development mode)
- All file uploads are saved locally
- CORS enabled for local development

## Troubleshooting

**Map not displaying:**
- Check browser console for errors
- Ensure Leaflet CSS is loaded
- Verify internet connection (for tile images)

**Uploads failing:**
- Verify backend server is running on port 3001
- Check `server/uploads/` directory permissions
- Check browser console and server logs

**API calls failing:**
- Ensure backend is running: `npm run start:server`
- Check if port 3001 is available
- Verify Vite proxy configuration in `vite.config.js`

## Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the project's coding standards
- [ ] All tests pass (`npm run build` succeeds)
- [ ] New features include appropriate documentation
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up to date with the base branch
- [ ] No unrelated changes are included
- [ ] Frontend and backend both run successfully
- [ ] All upload features work correctly

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
