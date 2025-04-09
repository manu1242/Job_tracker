import React from 'react'

const JobList = ({ jobs, fetchJobs }) => {
  const handleDelete = async id => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, { method: 'DELETE' })

    fetchJobs()
  }

  const handleStatusChange = async (id, status) => {
    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    fetchJobs()
  }

  return (
    <div className="job-list">
      {jobs.map(job => (
        <div key={job._id} className="job-card">
          <h3>{job.company}</h3>
          <p>{job.role}</p>
          <p>Status: {job.status}</p>
          <p>Date: {job.date}</p>
          <a href={job.link} target="_blank" rel="noreferrer">Link</a>
          <select value={job.status} onChange={e => handleStatusChange(job._id, e.target.value)}>
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
