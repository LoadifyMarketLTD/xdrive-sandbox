import React from 'react'

function JobCard({ job, onProofOfDelivery }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <div className="job-details">
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>From:</strong> {job.pickup}</p>
        <p><strong>To:</strong> {job.delivery}</p>
        <p><strong>Distance:</strong> {job.distance}</p>
      </div>
      <button
        className="btn btn-small"
        onClick={() => onProofOfDelivery(job)}
      >
        Proof of Delivery
      </button>
    </div>
  )
}

export default JobCard
