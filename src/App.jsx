import { useState, useEffect } from 'react'
import axios from 'axios'
import MapRoute from './components/MapRoute'
import SignaturePad from './components/SignaturePad'
import PhotoUpload from './components/PhotoUpload'
import JobCard from './components/JobCard'

function App() {
  const [showPODModal, setShowPODModal] = useState(false)
  const [jobs, setJobs] = useState([])
  const [signatureSaved, setSignatureSaved] = useState(false)

  // Mock jobs as fallback
  const mockJobs = [
    { id: 1, from: 'Manchester', to: 'London', status: 'in-progress', description: 'Delivery in progress' },
    { id: 2, from: 'Birmingham', to: 'Leeds', status: 'completed', description: 'Delivered successfully' },
    { id: 3, from: 'Liverpool', to: 'Bristol', status: 'pending', description: 'Awaiting pickup' }
  ]

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs')
        setJobs(response.data)
      } catch (error) {
        console.log('API not available, using mock data')
        setJobs(mockJobs)
      }
    }
    
    fetchJobs()
  }, [])

  const handleSignatureSaved = async (signatureData) => {
    try {
      // Convert base64 to just the data part
      const base64Data = signatureData.split(',')[1]
      
      const response = await axios.post('/api/upload/signature', {
        image: base64Data
      })
      
      console.log('Signature saved:', response.data)
      setSignatureSaved(true)
      alert('Signature saved successfully!')
    } catch (error) {
      console.error('Error saving signature:', error)
      alert('Failed to save signature. Please try again.')
    }
  }

  const openPODModal = () => {
    setShowPODModal(true)
    setSignatureSaved(false)
  }

  const closePODModal = () => {
    setShowPODModal(false)
  }

  return (
    <div className="app-container">
      {/* Header */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">xdrive-sandbox - Logistics Marketplace</span>
        </div>
      </nav>

      <div className="container mt-4">
        {/* Live Tracking Card */}
        <div className="card mb-4">
          <div className="card-header bg-info text-white">
            <h4 className="mb-0">Live Tracking</h4>
          </div>
          <div className="card-body">
            <p className="mb-3">Track your shipment in real-time from collection to delivery</p>
            <MapRoute />
          </div>
        </div>

        {/* Jobs List */}
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="mb-0">Active Jobs</h4>
          </div>
          <div className="card-body">
            {jobs.length === 0 ? (
              <p>Loading jobs...</p>
            ) : (
              jobs.map(job => <JobCard key={job.id} job={job} />)
            )}
          </div>
        </div>

        {/* Proof of Delivery Button */}
        <div className="text-center mb-4">
          <button 
            className="btn btn-success btn-lg" 
            onClick={openPODModal}
          >
            Complete Proof of Delivery
          </button>
        </div>
      </div>

      {/* Proof of Delivery Modal */}
      {showPODModal && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Proof of Delivery</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={closePODModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-4">
                    <h6>Signature</h6>
                    <SignaturePad onSaved={handleSignatureSaved} />
                    {signatureSaved && (
                      <div className="alert alert-success mt-2" role="alert">
                        Signature saved successfully!
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h6>Photo Upload</h6>
                    <PhotoUpload />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={closePODModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
