import React, { useEffect, useState } from 'react'
import './App.css'
import JobForm from './components/JobForm'
import JobList from './components/JobList'

const App = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [statusCounts, setStatusCounts] = useState({})
  const [filterStatus, setFilterStatus] = useState('')
  const [filterDate, setFilterDate] = useState('')

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
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/jobs`)
    const data = await res.json()
    const sortedJobs = sortByDate(data)
    setJobs(sortedJobs)
    setFilteredJobs(sortedJobs)
    setStatusCounts(getStatusCounts(sortedJobs))
  }

  useEffect(() => {
    fetchJobs()
  }, [])

 
  useEffect(() => {
    let filtered = [...jobs]
    if (filterStatus) {
      filtered = filtered.filter(job => job.status === filterStatus)
    }
    if (filterDate) {
      filtered = filtered.filter(job => job.date === filterDate)
    }
    setFilteredJobs(filtered)
  }, [filterStatus, filterDate, jobs])

  return (
    <div className="container">
      <h1>Student Job Tracker</h1>

      {}
      <div className="status-stats">
        {Object.entries(statusCounts).map(([status, count]) => (
          <span key={status} className="status-badge">
            {status}: {count}
          </span>
        ))}
      </div>

      { }
      <div className="filters">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
        />
      </div>

      <JobForm fetchJobs={fetchJobs} />
      <JobList jobs={filteredJobs} fetchJobs={fetchJobs} />
    </div>
  )
}

export default App
