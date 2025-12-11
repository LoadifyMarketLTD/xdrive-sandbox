import React from 'react'

export default function JobCard({ job }) {
  return (
    <div className="card job-card">
      <small className="date">{job.date}</small>
      <div className="route">
        <div className="origin">{job.from}</div>
        <div className="destination">{job.to}</div>
      </div>
      <div className="meta">
        <div className="provider">DELVS</div>
        <div className="price">{job.price}</div>
      </div>
    </div>
  )
}
