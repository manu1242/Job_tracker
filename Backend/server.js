import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import jobRoutes from './routes/jobroutes.js'
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/jobs', jobRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .then(() => app.listen(5000))
