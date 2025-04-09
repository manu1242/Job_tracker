import React, { useEffect, useState } from 'react'
import './App.css'
import JobForm from './components/JobForm'
import JobList from './components/JobList'

const App = () => {
  const [jobs, setJobs] = useState([])
  const [statusCounts, setStatusCounts] = useState({})

  const sortByDate = (jobs) => {
    return jobs.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  const getStatusCounts = (jobs) => {
    return jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1
      return acc
    }, {})
  }

  const fetchJobs = async () => {
    const res = await fetch('http://localhost:5000/api/jobs')
    const data = await res.json()
    const sortedJobs = sortByDate(data)
    setJobs(sortedJobs)
    setStatusCounts(getStatusCounts(sortedJobs))
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className="container">
      <h1>Student Job Tracker</h1>

      <div className="status-stats">
        {Object.entries(statusCounts).map(([status, count]) => (
          <span key={status} className="status-badge">
            {status}: {count}
          </span>
        ))}
      </div>

      <JobForm fetchJobs={fetchJobs} />
      <JobList jobs={jobs} fetchJobs={fetchJobs} />
    </div>
  )
}

export default App
