import React from 'react'

const JobList = ({ jobs, fetchJobs }) => {
  const handleDelete = async id => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`, {
      method: 'DELETE',
    })
    fetchJobs()
  }

  const handleStatusChange = async (id, status) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchJobs()
  }

  const getStatusColor = status => {
    switch (status) {
      case 'Applied':
        return 'orange'
      case 'Interview':
        return 'blue'
      case 'Offer':
        return 'green'
      case 'Rejected':
        return 'red'
      default:
        return 'gray'
    }
  }

  if (jobs.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No job applications yet.</p>
  }

  return (
    <div className="job-list">
      {jobs.map(job => (
        <div key={job._id} className="job-card" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h5>Company:</h5>
          <h3>{job.company}</h3>
          <p>Job Role: {job.role}</p>
          <p>Status: {job.status}</p>
          <p>Date: {job.date}</p>
          <a href={job.link} target="_blank" rel="noreferrer">Link</a>
          
          <select
            value={job.status}
            onChange={e => handleStatusChange(job._id, e.target.value)}
            style={{
              marginTop: '0.5rem',
              color: '#fff',
              backgroundColor: getStatusColor(job.status),
              padding: '0.4rem',
              borderRadius: '4px',
              border: 'none'
            }}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button onClick={() => handleDelete(job._id)} style={{ marginLeft: '1rem', padding: '0.4rem 1rem' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default JobList
