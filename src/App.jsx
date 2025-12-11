import React, { useState } from 'react'
import JobCard from './components/JobCard'

// Mock data
const mockJobs = [
  {
    id: 1,
    title: 'Furniture Delivery - Downtown',
    pickup: '123 Oak Street, Toronto',
    dropoff: '456 Maple Ave, Toronto',
    distance: '12 km',
    price: '$45',
    status: 'Available',
    urgency: 'Standard',
    weight: '150 kg'
  },
  {
    id: 2,
    title: 'Office Equipment Move',
    pickup: '789 Business Park, Mississauga',
    dropoff: '321 Corporate Dr, Brampton',
    distance: '25 km',
    price: '$95',
    status: 'Available',
    urgency: 'Urgent',
    weight: '300 kg'
  },
  {
    id: 3,
    title: 'Appliance Delivery',
    pickup: '555 Retail Plaza, Vaughan',
    dropoff: '777 Residential St, Richmond Hill',
    distance: '18 km',
    price: '$65',
    status: 'In Progress',
    urgency: 'Standard',
    weight: '200 kg'
  }
]

const mockActiveJob = {
  id: 3,
  title: 'Appliance Delivery',
  pickup: '555 Retail Plaza, Vaughan',
  dropoff: '777 Residential St, Richmond Hill',
  distance: '18 km',
  price: '$65',
  status: 'In Progress',
  driver: 'John Doe',
  eta: '15 min'
}

function App() {
  const [activeTab, setActiveTab] = useState('jobs')
  const [formData, setFormData] = useState({
    title: '',
    pickup: '',
    dropoff: '',
    weight: '',
    description: ''
  })

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitJob = (e) => {
    e.preventDefault()
    // Using alert for mock demonstration as specified in requirements
    // In production, replace with toast notification or modal component
    alert(`Job Posted Successfully!\n\nTitle: ${formData.title}\nPickup: ${formData.pickup}\nDropoff: ${formData.dropoff}\nWeight: ${formData.weight} kg\nDescription: ${formData.description}`)
    // Reset form
    setFormData({
      title: '',
      pickup: '',
      dropoff: '',
      weight: '',
      description: ''
    })
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">XDrive Logistics</h1>
          <div className="profile-section">
            <span className="user-name">Driver Dashboard</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          Available Jobs
        </button>
        <button
          className={`nav-tab ${activeTab === 'tracking' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracking')}
        >
          Live Tracking
        </button>
        <button
          className={`nav-tab ${activeTab === 'post' ? 'active' : ''}`}
          onClick={() => setActiveTab('post')}
        >
          Post a Job
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Jobs List View */}
        {activeTab === 'jobs' && (
          <div className="jobs-container">
            <h2 className="section-title">Available Jobs</h2>
            <div className="jobs-grid">
              {mockJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {/* Live Tracking View */}
        {activeTab === 'tracking' && (
          <div className="tracking-container">
            <h2 className="section-title">Live Tracking</h2>
            
            {/* Active Job Card */}
            <div className="active-job-card">
              <h3>Active Job</h3>
              <div className="job-details">
                <p><strong>Title:</strong> {mockActiveJob.title}</p>
                <p><strong>Pickup:</strong> {mockActiveJob.pickup}</p>
                <p><strong>Dropoff:</strong> {mockActiveJob.dropoff}</p>
                <p><strong>Distance:</strong> {mockActiveJob.distance}</p>
                <p><strong>Driver:</strong> {mockActiveJob.driver}</p>
                <p><strong>ETA:</strong> {mockActiveJob.eta}</p>
                <div className="status-badge in-progress">{mockActiveJob.status}</div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="map-placeholder">
              <div className="map-overlay">
                <div className="map-icon">📍</div>
                <p className="map-text">Live Map View</p>
                <p className="map-subtext">GPS tracking visualization would appear here</p>
                <div className="route-info">
                  <div className="route-point pickup">
                    <span className="route-marker">A</span>
                    <span className="route-label">Pickup Location</span>
                  </div>
                  <div className="route-line"></div>
                  <div className="route-point dropoff">
                    <span className="route-marker">B</span>
                    <span className="route-label">Dropoff Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post a Job Form */}
        {activeTab === 'post' && (
          <div className="post-job-container">
            <h2 className="section-title">Post a New Job</h2>
            <form className="job-form" onSubmit={handleSubmitJob}>
              <div className="form-group">
                <label htmlFor="title">Job Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="e.g., Furniture Delivery"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pickup">Pickup Address</label>
                <input
                  type="text"
                  id="pickup"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleFormChange}
                  placeholder="e.g., 123 Main St, Toronto"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dropoff">Dropoff Address</label>
                <input
                  type="text"
                  id="dropoff"
                  name="dropoff"
                  value={formData.dropoff}
                  onChange={handleFormChange}
                  placeholder="e.g., 456 Oak Ave, Toronto"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Estimated Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleFormChange}
                  placeholder="e.g., 150"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Provide additional details about the job..."
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Post Job
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 XDrive Logistics. Mock UI for demonstration purposes.</p>
      </footer>
    </div>
  )
}

export default App
