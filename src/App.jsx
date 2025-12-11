import { useState, useEffect } from 'react'
import axios from 'axios'
import MapRoute from './components/MapRoute'
import JobCard from './components/JobCard'
import SignaturePad from './components/SignaturePad'
import PhotoUpload from './components/PhotoUpload'

function App() {
  const [jobs, setJobs] = useState([])
  const [showPODModal, setShowPODModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [signature, setSignature] = useState(null)
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs')
      setJobs(response.data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }

  const handleOpenPOD = (job) => {
    setSelectedJob(job)
    setShowPODModal(true)
    setSignature(null)
    setPhoto(null)
  }

  const handleClosePOD = () => {
    setShowPODModal(false)
    setSelectedJob(null)
    setSignature(null)
    setPhoto(null)
  }

  const handleSignatureSaved = (signatureData) => {
    setSignature(signatureData)
  }

  const handlePhotoUploaded = (photoUrl) => {
    setPhoto(photoUrl)
  }

  const handleSubmitPOD = async () => {
    if (!signature) {
      alert('Please provide a signature')
      return
    }

    try {
      // Upload signature
      await axios.post('/api/upload/signature', {
        image: signature,
        jobId: selectedJob?.id
      })

      alert('Proof of Delivery submitted successfully!')
      handleClosePOD()
    } catch (error) {
      console.error('Error submitting POD:', error)
      alert('Failed to submit Proof of Delivery')
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>XDrive Sandbox - Full UI Stack</h1>
        <p>Map, Signature, Photo Upload, Backend Integration</p>
      </header>

      <main className="main-content">
        <section className="map-section">
          <h2>Live Tracking</h2>
          <MapRoute />
        </section>

        <section className="jobs-section">
          <h2>Jobs List</h2>
          <div className="jobs-list">
            {jobs.length === 0 ? (
              <p>No jobs available. Click "Add Sample Job" to create one.</p>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onOpenPOD={() => handleOpenPOD(job)}
                />
              ))
            )}
          </div>
          <button 
            className="btn btn-primary"
            onClick={async () => {
              try {
                await axios.post('/api/jobs', {
                  id: Date.now().toString(),
                  title: `Delivery Job ${jobs.length + 1}`,
                  origin: 'Manchester',
                  destination: 'London',
                  status: 'In Transit'
                })
                fetchJobs()
              } catch (error) {
                console.error('Error adding job:', error)
              }
            }}
          >
            Add Sample Job
          </button>
        </section>
      </main>

      {/* Proof of Delivery Modal */}
      {showPODModal && (
        <div className="modal-overlay" onClick={handleClosePOD}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Proof of Delivery</h2>
              <button className="close-btn" onClick={handleClosePOD}>
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {selectedJob && (
                <div className="job-details">
                  <h3>{selectedJob.title}</h3>
                  <p>From: {selectedJob.origin} → To: {selectedJob.destination}</p>
                  <p>Status: {selectedJob.status}</p>
                </div>
              )}

              <div className="pod-section">
                <h3>Signature</h3>
                <SignaturePad onSaved={handleSignatureSaved} />
              </div>

              <div className="pod-section">
                <h3>Photo Upload (Optional)</h3>
                <PhotoUpload onUploaded={handlePhotoUploaded} />
                {photo && (
                  <p className="success-message">Photo uploaded successfully!</p>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClosePOD}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleSubmitPOD}
                disabled={!signature}
              >
                Submit POD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
