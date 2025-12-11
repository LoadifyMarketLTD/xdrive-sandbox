# xdrive-sandbox

A full-stack UI mock application demonstrating a logistics delivery interface with interactive map, signature capture, and photo upload capabilities. Built with React, Vite, and Express - requires no external API keys to run.

## Features

- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Leaflet Map** - Interactive OpenStreetMap integration
- **Signature Capture** - Digital signature collection
- **Photo Upload** - Drag-and-drop file upload with preview
- **Express Backend** - Mock API endpoints for testing
- **CI/CD** - GitHub Actions workflow for automated builds

## Tech Stack

### Frontend
- React 18.2.0
- Vite 5.0.0
- Leaflet 1.9.4 + React-Leaflet 4.2.1
- React Signature Canvas 1.0.6
- React Dropzone 14.2.3
- Axios 1.4.0

### Backend
- Express 4.18.2
- Multer (file uploads)
- CORS enabled

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

2. Install dependencies:
```bash
npm install
```

3. Start the full stack (frontend + backend):
```bash
npm run dev:full
```

Or run them separately:

**Frontend only** (Vite dev server):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**Backend only** (Express server):
```bash
npm run start:server
```
Server runs on [http://localhost:3001](http://localhost:3001)

### Available Scripts

- `npm run dev` - Start Vite frontend dev server (port 3000)
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run start:server` - Start Express backend server (port 3001)
- `npm run dev:server` - Start backend with nodemon (auto-restart)
- `npm run dev:full` - Run both frontend and backend concurrently

## Features Overview

### 📍 Interactive Map
- OpenStreetMap integration via Leaflet
- Draggable markers for delivery locations
- No API keys required

### ✍️ Signature Capture
- HTML5 canvas-based signature pad
- Clear and save functionality
- Exports to PNG format

### 📷 Photo Upload
- Drag-and-drop interface
- Multiple file support
- Preview uploaded files
- Automatic validation (images only, 5MB max)

## Project Structure

```
xdrive-sandbox/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI/CD
├── server/
│   ├── index.js            # Express backend
│   └── uploads/            # File upload directory
├── src/
│   ├── App.jsx             # Main React component
│   ├── main.jsx            # React entry point
│   └── styles.css          # Global styles
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
└── README.md
```

## Backend API Endpoints

The Express server provides mock endpoints:

- `GET /api/health` - Health check endpoint
- `POST /api/upload` - Photo upload endpoint (multipart/form-data)
- `POST /api/signature` - Signature data endpoint (JSON)
- `GET /api/deliveries` - Mock delivery data

## Development Notes

- Frontend runs on port 3000
- Backend runs on port 3001
- CORS is enabled for local development
- Uploaded files are stored in `server/uploads/`
- No external API keys or services required
- Map tiles are served from OpenStreetMap's free tile server

## Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the project's coding standards
- [ ] Build succeeds (`npm run build`)
- [ ] Both frontend and backend start without errors
- [ ] New features include appropriate documentation
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up to date with the base branch
- [ ] No unrelated changes are included

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
