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

  if (jobs.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No job applications yet.</p>
  }

  return (
    <div className="job-list">
      {jobs.map(job => (
        <div key={job._id} className="job-card">
          <h3>Company:-{job.company}</h3>
          <p> JobRole:-{job.role}</p>
          <p>Status:- {job.status}</p>
          <p>Date:- {job.date}</p>
          <a href={job.link} target="_blank" rel="noreferrer">Link</a>
          <select
            value={job.status}
            onChange={e => handleStatusChange(job._id, e.target.value)}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <button onClick={() => handleDelete(job._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default JobList
