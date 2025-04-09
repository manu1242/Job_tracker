import Job from '../models/job.js'
export const getJobs = async (req, res) => {
  const jobs = await Job.find()
  res.json(jobs)
}

export const createJob = async (req, res) => {
  const newJob = new Job(req.body)
  await newJob.save()
  res.json(newJob)
}

export const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(job)
}

export const deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id)
  res.json({ message: 'Job deleted' })
}
