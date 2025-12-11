# xdrive-sandbox

A logistics marketplace demo application built with Next.js, React, and Tailwind CSS. This sandbox environment demonstrates modern web development practices including internationalization, API integration, responsive design, and full-stack features with a Node.js/Express backend.

## Features

### Frontend
- **Next.js 13** - React framework with server-side rendering
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **i18n Support** - Multi-language support (English, French, German, Romanian)
- **Leaflet Map** - Interactive map with route visualization (Manchester → London)
- **Signature Capture** - Digital signature pad for proof of delivery
- **Photo Upload** - Drag-and-drop photo upload with preview
- **Job Management** - Display and manage delivery jobs

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
- Next.js 13.5.6
- React 18.2.0
- React Leaflet 4.2.1 (OpenStreetMap tiles - no API keys required)
- React Signature Canvas 1.0.6
- React Dropzone 14.2.3
- Axios 1.6.0
- Tailwind CSS 3.3.5
- PostCSS & Autoprefixer
- ESLint

### Backend
- Node.js / Express 4.18.2
- Multer 1.4.5 (file uploads)
- CORS 2.8.5
- Nodemon 3.0.1 (development)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

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

#### Option 1: Run Frontend and Backend Separately (Recommended for Development)

**Terminal 1 - Frontend (Next.js):**
```bash
npm run dev
```
Opens at [http://localhost:3000](http://localhost:3000)

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
This starts both the Next.js frontend (port 3000) and Express backend (port 4000) simultaneously.

### Available Scripts

#### Frontend Scripts
- `npm run dev` - Start Next.js development server (port 3000)
- `npm run build` - Build Next.js for production
- `npm run start` - Start Next.js production server
- `npm run lint` - Run ESLint

#### Backend Scripts
- `npm run start:server` - Start Express server (port 4000)
- `npm run dev:server` - Start Express server with nodemon (auto-reload)

#### Combined Scripts
- `npm run dev:full` - Run both frontend and backend concurrently

## Testing Features

### 1. Map Visualization
1. Start the frontend: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. Scroll to the "Live Tracking" section
4. You should see an interactive map showing a route from Manchester to London with markers

### 2. Jobs List
1. Start the backend: `npm run start:server`
2. Start the frontend: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)
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

## Testing Locales

The application supports 4 locales: English (en), French (fr), German (de), and Romanian (ro).

To test different locales:
1. Run the development server (`npm run dev`)
2. Use the language switcher in the navigation bar
3. Or access directly via URL:
   - English: http://localhost:3000/
   - French: http://localhost:3000/fr
   - German: http://localhost:3000/de
   - Romanian: http://localhost:3000/ro

## Project Structure

```
xdrive-sandbox/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml          # Main CI workflow
│   │   └── nodejs.yml      # Node.js CI workflow (new)
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
├── components/
│   ├── LanguageSwitcher.js
│   ├── MapRoute.jsx        # Leaflet map with route visualization
│   ├── SignaturePad.jsx    # Signature capture component (new)
│   ├── PhotoUpload.jsx     # Photo upload component (new)
│   └── JobCard.jsx         # Job display card (new)
├── pages/
│   ├── api/
│   │   └── hello.js
│   ├── _app.js
│   ├── index.js            # Main page with all integrations
│   ├── about.js
│   └── post.js
├── server/                 # Backend Express server (new)
│   ├── index.js           # Express app with API endpoints
│   ├── package.json       # Server dependencies
│   └── uploads/           # Upload directory (gitignored)
│       ├── signatures/    # Saved signatures
│       └── photos/        # Saved photos
├── public/
│   ├── locales/
│   │   ├── en/common.json
│   │   ├── fr/common.json
│   │   ├── de/common.json
│   │   └── ro/common.json
│   └── leaflet/           # Leaflet marker icons
├── styles/
│   └── globals.css
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## API Endpoints

### Next.js API Routes (Port 3000)
- `GET /api/hello` - Sample API endpoint that returns JSON with timestamp and locale information

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
- Ensure frontend is on port 3000 and backend on port 4000
- If using different ports, update CORS configuration in `server/index.js`

## Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the project's coding standards
- [ ] All tests pass (`npm run build` succeeds)
- [ ] ESLint shows no errors (`npm run lint`)
- [ ] Backend server starts successfully (`npm run start:server`)
- [ ] New features include appropriate documentation
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up to date with the base branch
- [ ] No unrelated changes are included
- [ ] Localization files are updated if UI text changes
- [ ] No secrets or API keys are committed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
