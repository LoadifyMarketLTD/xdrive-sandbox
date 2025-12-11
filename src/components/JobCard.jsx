import React from 'react';

function JobCard({ job, onProofOfDelivery }) {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'in progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <span className={`job-status ${getStatusClass(job.status)}`}>
          {job.status}
        </span>
      </div>
      <div className="job-card-body">
        <p>
          <strong>Customer:</strong> {job.customer}
        </p>
        <p>
          <strong>Destination:</strong> {job.destination}
        </p>
      </div>
      <div className="job-card-actions">
        <button
          className="button-primary"
          onClick={() => onProofOfDelivery(job)}
          disabled={job.status === 'Completed'}
        >
          Proof of Delivery
        </button>
      </div>
    </div>
  );
}

export default JobCard;
