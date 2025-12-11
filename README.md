# XDrive UI Mock

A functional React + Vite UI mock for XDrive Logistics that demonstrates the core screens without requiring external API keys or backend services.

## Features

- **Jobs List** - Mobile-style job cards showing routes and pricing
- **Live Tracking Mock** - Map placeholder with route assignment details
- **Post a Job Form** - Complete job posting form with validation
- **Profile Card** - Driver profile with status
- **Active Job Card** - Current job details display

## Tech Stack

- React 18.2.0
- Vite 5.0.0
- Pure CSS (no framework dependencies)

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

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to see the result.

### Available Scripts

- `npm run dev` - Start Vite development server (default port: 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
xdrive-sandbox/
├── src/
│   ├── components/
│   │   └── JobCard.jsx       # Reusable job card component
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # React entry point
│   └── styles.css             # Complete application styles
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Features Overview

### Jobs List
Displays a list of available jobs with:
- Date and route information
- Origin and destination cities
- Provider and price details

### Live Tracking (Mock)
Shows a mock tracking interface with:
- Map placeholder for future integration
- Driver assignment information
- Collection and delivery addresses
- Job reference number

### Post a Job Form
Complete form for posting new jobs with fields for:
- Pickup and delivery locations
- Pickup and delivery dates
- Vehicle type selection
- Payment amount
- Reference number
- Additional notes

### Profile & Active Job
Sidebar displaying:
- Driver profile with avatar
- Online/offline status toggle
- Current active job details with timing

## Development Notes

- All data is mocked - no external APIs required
- Forms show alerts on submission (mock behavior)
- Ready for integration with real backend services
- Maps can be replaced with real mapping libraries (Leaflet, Mapbox, Google Maps)
- Responsive design works on mobile and desktop

## Future Enhancements

Potential additions for future iterations:
- Real-time map integration (Leaflet, Mapbox, or Google Maps)
- Signature capture functionality
- Photo upload for proof of delivery
- Backend API integration
- Real-time WebSocket updates for tracking
- Authentication and user management

## Testing

To test the UI mock:
1. Start the development server with `npm run dev`
2. Navigate to http://localhost:5173
3. Verify the Jobs list displays three sample jobs
4. Check the Live Tracking section shows map placeholder and details
5. Fill out the Post a Job form and submit to see alert confirmation
6. Test responsive design by resizing browser window

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
