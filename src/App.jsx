import React, { useState, useEffect } from 'react'
import axios from 'axios'
import JobCard from './components/JobCard'
import MapRoute from './components/MapRoute'
import SignaturePad from './components/SignaturePad'
import PhotoUpload from './components/PhotoUpload'

const FALLBACK_JOBS = [
  {
    id: 1,
    title: 'Delivery to Birmingham',
    status: 'In Progress',
    pickup: 'Manchester',
    delivery: 'Birmingham',
    distance: '88 miles'
  },
  {
    id: 2,
    title: 'Delivery to London',
    status: 'Pending',
    pickup: 'Birmingham',
    delivery: 'London',
    distance: '110 miles'
  }
]

function App() {
  const [jobs, setJobs] = useState([])
  const [showPODModal, setShowPODModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [signature, setSignature] = useState(null)
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/jobs')
      setJobs(response.data)
    } catch (error) {
      console.warn('Server not available, using fallback jobs:', error.message)
      setJobs(FALLBACK_JOBS)
    }
  }

  const handleProofOfDelivery = (job) => {
    setSelectedJob(job)
    setShowPODModal(true)
    setSignature(null)
    setPhoto(null)
  }

  const handleSignatureSave = async (signatureData) => {
    setSignature(signatureData)
    try {
      await axios.post('http://localhost:3001/api/upload/signature', {
        image: signatureData
      })
      console.log('Signature saved successfully')
    } catch (error) {
      console.error('Failed to save signature:', error)
    }
  }

  const handlePhotoUpload = async (file) => {
    setPhoto(URL.createObjectURL(file))
    // Photo upload is handled by PhotoUpload component
  }

  const handleSubmitPOD = () => {
    if (signature && photo) {
      alert('Proof of Delivery submitted successfully!')
      setShowPODModal(false)
    } else {
      alert('Please provide both signature and photo')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>xDrive Logistics Dashboard</h1>
      </header>

      <div className="content">
        <div className="sidebar">
          <h2>Jobs</h2>
          <div className="jobs-list">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onProofOfDelivery={handleProofOfDelivery}
              />
            ))}
          </div>
        </div>

        <div className="main-content">
          <h2>Live Tracking</h2>
          <div className="map-container">
            <MapRoute />
          </div>
        </div>
      </div>

      {showPODModal && (
        <div className="modal-overlay" onClick={() => setShowPODModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Proof of Delivery - {selectedJob?.title}</h3>
              <button
                className="close-btn"
                onClick={() => setShowPODModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="pod-section">
                <h4>Signature</h4>
                <SignaturePad onSaved={handleSignatureSave} />
                {signature && <div className="success-msg">✓ Signature saved</div>}
              </div>

              <div className="pod-section">
                <h4>Photo</h4>
                <PhotoUpload onPhotoUploaded={handlePhotoUpload} />
                {photo && (
                  <div className="photo-preview">
                    <img src={photo} alt="Uploaded proof" />
                    <div className="success-msg">✓ Photo uploaded</div>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleSubmitPOD}
                disabled={!signature || !photo}
              >
                Submit POD
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowPODModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
