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
    </div>
  )
}
