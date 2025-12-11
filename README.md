# xdrive-sandbox

A full-stack logistics demo application with React + Vite frontend and Express backend. Features live tracking with interactive maps, signature capture, and photo upload capabilities for proof of delivery.

## Features

- **React 18 + Vite** - Fast, modern frontend development
- **Express Backend** - RESTful API with file uploads
- **Live Map Tracking** - Interactive route visualization using Leaflet/OpenStreetMap
- **Proof of Delivery** - Signature capture and photo upload
- **Mock API** - Full backend simulation with no external dependencies
- **CI/CD** - GitHub Actions workflow for automated testing and builds

## Tech Stack

### Frontend
- React 18.2.0
- Vite 5.x
- Leaflet & React-Leaflet for maps
- React Signature Canvas for signature capture
- React Dropzone for file uploads
- Axios for API calls

### Backend
- Express 4.x
- Multer for file uploads
- CORS enabled
- Mock job data

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

2. Install root dependencies:
```bash
npm install
```

3. Install server dependencies:
```bash
cd server
npm install
cd ..
```

### Running the Application

#### Option 1: Run frontend and backend separately

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run start:server
```

#### Option 2: Run both simultaneously
```bash
npm run dev:full
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

**Root package.json:**
- `npm run dev` - Start Vite development server (frontend only)
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run start:server` - Start Express backend
- `npm run dev:server` - Start Express backend with nodemon (auto-reload)
- `npm run dev:full` - Run both frontend and backend concurrently

**Server package.json:**
- `npm start` - Start Express server
- `npm run dev` - Start Express server with auto-reload

## Testing the Application

Once running, verify the following features:

1. **Live Tracking Map**
   - Map displays with markers for Manchester, Birmingham, and London
   - Route line connects the three cities
   - Map auto-fits to show all markers

2. **Job Management**
   - Jobs list loads from `/api/jobs` endpoint
   - If backend is unavailable, falls back to client-side mock data
   - Click "Proof of Delivery" button on any job card

3. **Proof of Delivery Modal**
   - Draw signature with mouse/touch
   - Signature saves to `server/uploads/signatures/` as PNG
   - Upload photo via drag-and-drop or file picker
   - Photo saves to `server/uploads/photos/`
   - Both signature and photo required before POD submission

4. **Backend API**
   - `GET /api/jobs` - Returns mock job list
   - `POST /api/jobs` - Create new job
   - `POST /api/upload/signature` - Save signature (base64 → PNG)
   - `POST /api/upload/photo` - Save photo (multipart upload)

## Project Structure

```
xdrive-sandbox/
├── .github/
│   └── workflows/
│       └── nodejs.yml          # CI workflow
├── src/
│   ├── components/
│   │   ├── JobCard.jsx         # Job display component
│   │   ├── MapRoute.jsx        # Leaflet map with route
│   │   ├── SignaturePad.jsx    # Signature capture
│   │   └── PhotoUpload.jsx     # Photo dropzone
│   ├── App.jsx                 # Main application
│   ├── main.jsx                # Entry point
│   └── styles.css              # Global styles
├── server/
│   ├── uploads/
│   │   ├── signatures/         # Saved signature PNGs
│   │   └── photos/             # Uploaded photos
│   ├── index.js                # Express server
│   └── package.json            # Server dependencies
├── index.html                  # Vite HTML template
├── vite.config.js              # Vite configuration
├── package.json                # Root dependencies
└── README.md
```

## API Endpoints

- `GET /api/jobs` - Returns list of mock jobs
- `POST /api/jobs` - Create new job (accepts job object)
- `POST /api/upload/signature` - Upload signature as base64 JSON
- `POST /api/upload/photo` - Upload photo as multipart/form-data
- `GET /health` - Server health check

## Key Technologies

**No API Keys Required:**
- Uses OpenStreetMap tiles via Leaflet (free, no authentication)
- All features work offline with mock data
- Backend stores files locally

**Map Implementation:**
- Leaflet.js with React-Leaflet wrapper
- OpenStreetMap tile layer
- Route visualization between Manchester → Birmingham → London
- Auto-fitting bounds to show all markers

## Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the project's coding standards
- [ ] All tests pass (`npm run build` succeeds)
- [ ] ESLint shows no errors (`npm run lint`)
- [ ] New features include appropriate documentation
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up to date with the base branch
- [ ] No unrelated changes are included
- [ ] Localization files are updated if UI text changes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
