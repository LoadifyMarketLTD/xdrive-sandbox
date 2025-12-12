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
export default function JobCard({ job, onOpenPOD }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <div className="job-info">
        <p><strong>From:</strong> {job.origin}</p>
        <p><strong>To:</strong> {job.destination}</p>
        <p><strong>Status:</strong> <span className="status">{job.status}</span></p>
      </div>
      <button className="btn btn-primary" onClick={onOpenPOD}>
        Complete POD
      </button>
export default function JobCard({ job }) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_transit: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }

  const statusText = {
    pending: 'Pending',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500">
            Job #{job.id}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status] || 'bg-gray-100 text-gray-800'}`}>
          {statusText[job.status] || job.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-700">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">
            <span className="font-medium">Collection:</span> {job.collection}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">
            <span className="font-medium">Delivery:</span> {job.delivery}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-sm">
            <span className="font-medium">Driver:</span> {job.driver}
          </span>
        </div>

        <div className="flex items-center text-gray-500 text-xs mt-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {new Date(job.date).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
