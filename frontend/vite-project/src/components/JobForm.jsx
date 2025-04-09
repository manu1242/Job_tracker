import React, { useState } from 'react'

const JobForm = ({ fetchJobs }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    date: '',
    link: ''
  })

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    setFormData({ company: '', role: '', status: 'Applied', date: '', link: '' })
    fetchJobs()
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <input name="company" value={formData.company} onChange={handleChange} placeholder="CompanyName" required />
      <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" required />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <input name="link" value={formData.link} onChange={handleChange} placeholder="Link" required />
      <button type="submit">Add Job</button>
    </form>
  )
}

export default JobForm
