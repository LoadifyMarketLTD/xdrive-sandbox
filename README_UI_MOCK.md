# XDrive Logistics - UI Mock (React + Vite)

A functional UI mock for XDrive Logistics platform built with React and Vite. This application demonstrates the core screens for a logistics marketplace including job listings, live tracking, and job posting functionality.

## Features

- **Available Jobs List**: Browse and view available delivery jobs with details like pickup/dropoff locations, distance, price, and urgency
- **Live Tracking Mock**: View active job details with a visual map placeholder showing route information
- **Post a Job Form**: Submit new delivery jobs with title, addresses, weight, and description
- **Profile/Active Job Card**: Display current job status with driver information and ETA

## Tech Stack

- **React 18.2.0** - UI library
- **Vite 5.0.0** - Build tool and dev server
- **Pure CSS** - Styling with modern gradients and animations

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173)

## Available Scripts

- `npm run dev` - Start Vite development server on port 5173
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Testing the Application

### Available Jobs Tab
1. Click on "Available Jobs" in the navigation
2. View the list of mock delivery jobs
3. Each card shows:
   - Job title and urgency badge
   - Pickup and dropoff addresses
   - Distance and weight
   - Price and status
   - "Accept Job" button for available jobs

### Live Tracking Tab
1. Click on "Live Tracking" in the navigation
2. View the active job details card with:
   - Job information
   - Driver name and ETA
   - Status badge
3. See the map placeholder with:
   - Visual route markers (A to B)
   - Mock GPS tracking message

### Post a Job Tab
1. Click on "Post a Job" in the navigation
2. Fill out the form with:
   - Job title
   - Pickup address
   - Dropoff address
   - Estimated weight (kg)
   - Description
3. Click "Post Job" button
4. An alert will confirm the job posting (mock submission)
5. Form resets after submission

## Project Structure

```
xdrive-sandbox/
├── index.html                  # Entry HTML file
├── package.json               # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── src/
│   ├── main.jsx              # React root mounting
│   ├── App.jsx               # Main application component
│   ├── styles.css            # Global styles
│   └── components/
│       └── JobCard.jsx       # Job card component
└── README_UI_MOCK.md         # This file
```

## Mock Data

The application uses hardcoded mock data to simulate:
- 3 sample jobs (2 available, 1 in progress)
- 1 active job with driver and tracking information
- No external API calls or API keys required

## Design Features

- **Gradient Headers**: Purple gradient for modern look
- **Card-based Layout**: Clean job cards with hover effects
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Tab Navigation**: Easy switching between main screens
- **Status Badges**: Color-coded job status indicators
- **Form Validation**: Required fields for job posting
- **Animations**: Smooth transitions and fade-in effects

## Future Enhancements

This mock serves as a foundation for future development:

1. **Map Integration**: Replace placeholder with real maps (Google Maps, Mapbox, etc.)
2. **Signature Capture**: Add digital signature functionality for deliveries
3. **Photo Upload**: Enable photo capture for proof of delivery
4. **Backend API**: Connect to Express/Node.js backend for real data
5. **Real-time Updates**: WebSocket integration for live tracking
6. **Authentication**: User login and role-based access
7. **Database**: PostgreSQL/MongoDB integration for persistence

## Notes

- **No API Keys Required**: Application runs entirely locally with mock data
- **No External Dependencies**: Only React, Vite, and their peer dependencies
- **Production Ready Structure**: Clean, maintainable code ready for feature additions
- **Modern Tooling**: Fast development with Vite's hot module replacement

## Troubleshooting

### Port Already in Use
If port 5173 is occupied, Vite will automatically use the next available port. Check the terminal output for the actual URL.

### Module Not Found Errors
Run `npm install` to ensure all dependencies are installed.

### Build Fails
Ensure you're using Node.js 18.x or higher. Check with `node --version`.

## License

This project is licensed under the MIT License.

## Contributing

This is a demonstration project. For production use, consider:
- Adding comprehensive error handling
- Implementing proper state management (Redux, Zustand)
- Adding unit and integration tests
- Setting up CI/CD pipelines
- Implementing security best practices
