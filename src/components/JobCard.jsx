export default function JobCard({ job }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Job #{job.id}</h5>
        <p className="card-text">
          <strong>From:</strong> {job.from}<br />
          <strong>To:</strong> {job.to}<br />
          <strong>Status:</strong> <span className={`badge bg-${job.status === 'completed' ? 'success' : job.status === 'in-progress' ? 'primary' : 'secondary'}`}>
            {job.status}
          </span>
        </p>
        {job.description && (
          <p className="card-text">
            <small className="text-muted">{job.description}</small>
          </p>
        )}
      </div>
    </div>
  )
}
