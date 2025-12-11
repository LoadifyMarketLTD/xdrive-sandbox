import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './components/JobCard';
import MapRoute from './components/MapRoute';
import SignaturePad from './components/SignaturePad';
import PhotoUpload from './components/PhotoUpload';

const mockJobs = [
  {
    id: 1,
    title: 'Delivery to Birmingham',
    customer: 'ABC Corp',
    status: 'In Progress',
    destination: 'Birmingham, UK',
  },
  {
    id: 2,
    title: 'Pickup from Manchester',
    customer: 'XYZ Ltd',
    status: 'Pending',
    destination: 'Manchester, UK',
  },
  {
    id: 3,
    title: 'Express to London',
    customer: 'Quick Logistics',
    status: 'Completed',
    destination: 'London, UK',
  },
];

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showPodModal, setShowPodModal] = useState(false);
  const [signature, setSignature] = useState(null);
  const [serverAvailable, setServerAvailable] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/jobs', {
        timeout: 2000,
      });
      setJobs(response.data);
      setServerAvailable(true);
    } catch (error) {
      console.log('Server not available, using mock data');
      setJobs(mockJobs);
      setServerAvailable(false);
    }
  };

  const handleProofOfDelivery = (job) => {
    setSelectedJob(job);
    setShowPodModal(true);
  };

  const handleSignatureSaved = (signatureData) => {
    setSignature(signatureData);
  };

  const handleSubmitPod = async () => {
    if (!signature) {
      alert('Please provide a signature');
      return;
    }

    try {
      if (serverAvailable) {
        await axios.post('http://localhost:3001/api/upload/signature', {
          image: signature,
          jobId: selectedJob.id,
        });
      }
      alert('Proof of Delivery submitted successfully!');
      setShowPodModal(false);
      setSignature(null);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting POD:', error);
      alert('Failed to submit Proof of Delivery');
    }
  };

  const handleClosePodModal = () => {
    setShowPodModal(false);
    setSignature(null);
    setSelectedJob(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>XDrive - Logistics Platform</h1>
        {!serverAvailable && (
          <div className="warning-banner">
            ⚠️ Backend server not available - using mock data
          </div>
        )}
      </header>

      <div className="app-content">
        <section className="jobs-section">
          <h2>Active Jobs</h2>
          <div className="jobs-list">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onProofOfDelivery={handleProofOfDelivery}
              />
            ))}
          </div>
        </section>

        <section className="map-section">
          <h2>Live Tracking</h2>
          <MapRoute />
        </section>
      </div>

      {showPodModal && (
        <div className="modal-overlay" onClick={handleClosePodModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Proof of Delivery</h2>
              <button className="close-button" onClick={handleClosePodModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="pod-section">
                <h3>Job: {selectedJob?.title}</h3>
                <p>Customer: {selectedJob?.customer}</p>
              </div>

              <div className="pod-section">
                <h3>Signature</h3>
                <SignaturePad onSaved={handleSignatureSaved} />
              </div>

              <div className="pod-section">
                <h3>Photo Upload</h3>
                <PhotoUpload jobId={selectedJob?.id} />
              </div>

              <div className="modal-actions">
                <button className="button-secondary" onClick={handleClosePodModal}>
                  Cancel
                </button>
                <button className="button-primary" onClick={handleSubmitPod}>
                  Submit POD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
