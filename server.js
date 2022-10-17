// npm modules
import 'dotenv/config.js'
import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'

// import routers
import { router as profilesRouter } from './routes/profiles.js'
import { router as authRouter } from './routes/auth.js'

// connect to database
import './config/database.js'

// set up app
const app = express()

// middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

// mounted routers
app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)

// send 404 error
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

// handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export {
  app
}
