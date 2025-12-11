import React from 'react'

function JobCard({ job }) {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'status-available'
      case 'in progress':
        return 'status-in-progress'
      case 'completed':
        return 'status-completed'
      default:
        return ''
    }
  }

  const getUrgencyClass = (urgency) => {
    return urgency.toLowerCase() === 'urgent' ? 'urgency-badge urgent' : 'urgency-badge'
  }

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        {job.urgency && (
          <span className={getUrgencyClass(job.urgency)}>
            {job.urgency}
          </span>
        )}
      </div>
      
      <div className="job-card-body">
        <div className="job-info-row">
          <span className="info-label">📍 Pickup:</span>
          <span className="info-value">{job.pickup}</span>
        </div>
        
        <div className="job-info-row">
          <span className="info-label">🎯 Dropoff:</span>
          <span className="info-value">{job.dropoff}</span>
        </div>
        
        <div className="job-info-row">
          <span className="info-label">📏 Distance:</span>
          <span className="info-value">{job.distance}</span>
        </div>
        
        {job.weight && (
          <div className="job-info-row">
            <span className="info-label">⚖️ Weight:</span>
            <span className="info-value">{job.weight}</span>
          </div>
        )}
      </div>
      
      <div className="job-card-footer">
        <div className="job-price">{job.price}</div>
        <div className={`job-status ${getStatusClass(job.status)}`}>
          {job.status}
        </div>
      </div>
      
      {job.status.toLowerCase() === 'available' && (
        <button className="accept-job-btn">Accept Job</button>
      )}
    </div>
  )
}

export default JobCard
