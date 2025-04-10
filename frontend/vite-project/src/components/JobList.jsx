import React from 'react'


const JobList = ({ jobs, fetchJobs }) => {
  const handleDelete = async id => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`, {
      method: 'DELETE',
    })
    fetchJobs()
  }

  const getStatusClass = status => {
    switch (status) {
      case 'Applied':
        return 'status-applied'
      case 'Interview':
        return 'status-interview'
      case 'Offer':
        return 'status-offer'
      case 'Rejected':
        return 'status-rejected'
      default:
        return 'status-default'
    }
  }

  if (jobs.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No job applications yet.</p>
  }

  return (
    <div className="table-container">
      <table className="job-table">
        <thead className='table-header'>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Date</th>
            <th>Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job._id}>
              <td>{job.company}</td>
              <td>{job.role}</td>
              <td>
                {job.status}
                <span className={`status-dot ${getStatusClass(job.status)}`}></span>
              </td>
              <td>{job.date}</td>
              <td>
                <a href={job.link} target="_blank" rel="noreferrer">
                  View
                </a>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(job._id)}>
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JobList
