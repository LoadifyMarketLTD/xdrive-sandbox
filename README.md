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

3. Install backend dependencies:
```bash
cd server
npm install
cd ..
```

### Running the Application

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
