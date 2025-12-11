# XDrive Logistics UI Mock

A functional React + Vite UI mock for XDrive Logistics that replicates core logistics platform screens. This is a standalone demo application with mock data that runs locally without external API keys.

## Features

- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Mock Data** - Self-contained with sample job listings
- **Responsive Design** - Works on desktop and mobile devices
- **Multiple Screens** - Jobs list, Live Tracking, Post a Job form, and Profile

## Tech Stack

- React 18.2.0
- Vite 4.3.9
- Pure CSS (no additional frameworks)

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

4. Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

### Available Scripts

- `npm run dev` - Start Vite development server at http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Application Screens

### 1. Jobs List
Displays available logistics jobs with details including:
- Job title and description
- Pickup and delivery locations
- Distance and price
- Current status (Active, Pending, Completed)
- Assigned driver (if applicable)

### 2. Live Tracking
Mock real-time tracking interface featuring:
- Static map placeholder (no API keys needed)
- Current assignment details
- Driver information
- Progress bar showing delivery status
- Estimated time of arrival (ETA)

### 3. Post a Job
Form for creating new logistics jobs with fields for:
- Pickup location
- Delivery location
- Weight and dimensions
- Item description
- Mock submission (shows alert on submit)

### 4. Profile
User profile section displaying:
- User information
- Statistics (total, active, and completed jobs)
- Current active job card

## Project Structure

```
xdrive-sandbox/
├── src/
│   ├── components/
│   │   └── JobCard.jsx      # Reusable job card component
│   ├── App.jsx               # Main application with all screens
│   ├── main.jsx              # React app entry point
│   └── styles.css            # Application styles
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Mock Data

The application uses mock data defined in `src/App.jsx`. No external APIs or databases are required. This makes it perfect for:
- UI/UX demonstrations
- Frontend development without backend dependencies
- Quick prototyping and testing
- Design reviews and stakeholder presentations

## Future Enhancements

This mock serves as a foundation for integrating:
- Real-time maps (Google Maps, Mapbox, etc.)
- Signature capture for proof of delivery
- Photo/document upload functionality
- Backend API integration
- User authentication
- WebSocket for live tracking updates

## Notes

- **No API Keys Required**: Maps are mocked with placeholders, so there's no risk of billing or key management
- **Self-Contained**: All data is local mock data
- **Easy to Extend**: Clean component structure makes it simple to add real integrations later

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
