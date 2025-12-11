import React from 'react';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className={`status status-${job.status.toLowerCase()}`}>
          {job.status}
        </span>
      </div>
      <div className="job-details">
        <div className="detail-row">
          <span className="label">Pickup:</span>
          <span className="value">{job.pickup}</span>
        </div>
        <div className="detail-row">
          <span className="label">Delivery:</span>
          <span className="value">{job.delivery}</span>
        </div>
        <div className="detail-row">
          <span className="label">Distance:</span>
          <span className="value">{job.distance}</span>
        </div>
        <div className="detail-row">
          <span className="label">Price:</span>
          <span className="value price">{job.price}</span>
        </div>
      </div>
      {job.driver && (
        <div className="job-driver">
          <span className="driver-label">Driver:</span>
          <span className="driver-name">{job.driver}</span>
        </div>
      )}
    </div>
  );
}

export default JobCard;
