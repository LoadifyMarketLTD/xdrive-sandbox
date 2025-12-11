import React, { useState } from 'react';
import JobCard from './components/JobCard';

function App() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [formData, setFormData] = useState({
    pickup: '',
    delivery: '',
    weight: '',
    dimensions: '',
    description: ''
  });

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: 'Express Delivery - Electronics',
      pickup: 'London, UK',
      delivery: 'Manchester, UK',
      distance: '210 miles',
      price: '£450',
      status: 'Active',
      driver: 'John Smith'
    },
    {
      id: 2,
      title: 'Furniture Transport',
      pickup: 'Birmingham, UK',
      delivery: 'Leeds, UK',
      distance: '115 miles',
      price: '£320',
      status: 'Pending',
      driver: null
    },
    {
      id: 3,
      title: 'Medical Supplies Rush',
      pickup: 'Bristol, UK',
      delivery: 'Oxford, UK',
      distance: '75 miles',
      price: '£280',
      status: 'Active',
      driver: 'Sarah Johnson'
    },
    {
      id: 4,
      title: 'Construction Materials',
      pickup: 'Liverpool, UK',
      delivery: 'Sheffield, UK',
      distance: '85 miles',
      price: '£195',
      status: 'Completed',
      driver: 'Mike Davis'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Job posted successfully! (Mock submission)\n\n' + 
          `Pickup: ${formData.pickup}\n` +
          `Delivery: ${formData.delivery}\n` +
          `Weight: ${formData.weight}\n` +
          `Dimensions: ${formData.dimensions}\n` +
          `Description: ${formData.description}`);
    
    // Reset form
    setFormData({
      pickup: '',
      delivery: '',
      weight: '',
      dimensions: '',
      description: ''
    });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>🚚 XDrive Logistics</h1>
        </div>
        <nav className="nav">
          <button 
            className={activeTab === 'jobs' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('jobs')}
          >
            Jobs
          </button>
          <button 
            className={activeTab === 'tracking' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('tracking')}
          >
            Live Tracking
          </button>
          <button 
            className={activeTab === 'post' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('post')}
          >
            Post a Job
          </button>
          <button 
            className={activeTab === 'profile' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Jobs List Tab */}
        {activeTab === 'jobs' && (
          <div className="tab-content">
            <h2>Available Jobs</h2>
            <div className="jobs-grid">
              {mockJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {/* Live Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="tab-content">
            <h2>Live Tracking</h2>
            <div className="tracking-container">
              <div className="map-placeholder">
                <div className="map-overlay">
                  <p>📍 Map View</p>
                  <p className="map-note">(Static placeholder - no API keys needed)</p>
                </div>
              </div>
              <div className="tracking-info">
                <h3>Current Assignment</h3>
                <div className="tracking-details">
                  <p><strong>Job:</strong> Express Delivery - Electronics</p>
                  <p><strong>Driver:</strong> John Smith</p>
                  <p><strong>Status:</strong> <span className="status-active">En Route</span></p>
                  <p><strong>From:</strong> London, UK</p>
                  <p><strong>To:</strong> Manchester, UK</p>
                  <p><strong>ETA:</strong> 2h 45m</p>
                  <p><strong>Progress:</strong></p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
                  </div>
                  <p className="progress-text">65% Complete</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post a Job Tab */}
        {activeTab === 'post' && (
          <div className="tab-content">
            <h2>Post a New Job</h2>
            <form className="job-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="pickup">Pickup Location</label>
                <input
                  type="text"
                  id="pickup"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleInputChange}
                  placeholder="Enter pickup address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="delivery">Delivery Location</label>
                <input
                  type="text"
                  id="delivery"
                  name="delivery"
                  value={formData.delivery}
                  onChange={handleInputChange}
                  placeholder="Enter delivery address"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dimensions">Dimensions (LxWxH cm)</label>
                  <input
                    type="text"
                    id="dimensions"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g., 100x50x30"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the items to be transported"
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

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="tab-content">
            <h2>Profile</h2>
            <div className="profile-container">
              <div className="profile-card">
                <div className="profile-avatar">
                  <span className="avatar-icon">👤</span>
                </div>
                <div className="profile-info">
                  <h3>Demo User</h3>
                  <p className="profile-email">demo@xdrive.com</p>
                  <p className="profile-role">Shipper</p>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Total Jobs</h4>
                  <p className="stat-number">24</p>
                </div>
                <div className="stat-card">
                  <h4>Active Jobs</h4>
                  <p className="stat-number">2</p>
                </div>
                <div className="stat-card">
                  <h4>Completed</h4>
                  <p className="stat-number">22</p>
                </div>
              </div>

              <div className="active-job-section">
                <h3>Active Job</h3>
                <JobCard job={mockJobs[0]} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 XDrive Logistics - UI Mock Demo</p>
      </footer>
    </div>
  );
}

export default App;
