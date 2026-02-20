import { useState, useEffect } from 'react'
import axios from 'axios'
import MapRoute from './components/MapRoute'
import JobCard from './components/JobCard'
import SignaturePad from './components/SignaturePad'
import PhotoUpload from './components/PhotoUpload'
import PlaceBid from './components/PlaceBid'

const API_BASE_URL = 'http://localhost:4000'

export default function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [showBidModal, setShowBidModal] = useState(false)
  const [bidJobId, setBidJobId] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/jobs`)
      if (response.data.success) {
        setJobs(response.data.jobs)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (job = null) => {
    setSelectedJob(job)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedJob(null)
  }

  const handleOpenBidModal = (jobId) => {
    setBidJobId(jobId)
    setShowBidModal(true)
  }

  const handleCloseBidModal = () => {
    setShowBidModal(false)
    setBidJobId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">XDrive Logistics</h1>
          <p className="text-blue-100 mt-1">Full Stack UI Mock - Vite + React</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Live Tracking Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Live Tracking</h2>
          <p className="text-gray-600 mb-6">
            Real-time route visualization from Manchester to London
          </p>
          <MapRoute />
        </section>

        {/* Active Jobs Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Active Jobs</h2>
              <p className="text-gray-600 mt-1">
                {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} in the system
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Open Proof of Delivery
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No active jobs found</p>
              <p className="text-gray-400 text-sm mt-2">
                Make sure the backend server is running on port 4000
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.id}>
                  <JobCard job={job} />
                  <button
                    onClick={() => handleOpenBidModal(job.id)}
                    className="mt-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Place Bid
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Proof of Delivery Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Proof of Delivery</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  📝 Signature Capture
                </h4>
                <SignaturePad
                  jobId={selectedJob?.id}
                  onSuccess={(data) => console.log('Signature saved:', data)}
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  📸 Photo Upload
                </h4>
                <PhotoUpload
                  jobId={selectedJob?.id}
                  onSuccess={(data) => console.log('Photo uploaded:', data)}
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Place Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Place a Bid</h3>
              <button
                onClick={handleCloseBidModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <PlaceBid jobId={bidJobId} onBidPlaced={handleCloseBidModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
