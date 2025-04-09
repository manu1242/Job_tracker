import React from 'react'

const JobList = ({ jobs, fetchJobs }) => {
  const handleDelete = async id => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`, {
      method: 'DELETE',
    })
    fetchJobs()
  }

  const getStatusDotColor = status => {
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
        <div key={job._id} className="job-card" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
          <h4>Company:</h4>
          <h3>{job.company}</h3>
          <p>Job Role: {job.role}</p>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            Status:&nbsp;
            {job.status}
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: getStatusDotColor(job.status),
                marginLeft: '10px',
              }}
            ></span>
            
          </p>
          <p>Date: {job.date}</p>
          <a href={job.link} target="_blank" rel="noreferrer">Link</a>
          <br />
          <button onClick={() => handleDelete(job._id)} style={{ marginTop: '0.5rem' }}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default JobList
