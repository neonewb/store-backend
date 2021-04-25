require('dotenv').config()
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import { sequelize } from './db/db'
import { errorHandler } from './middleware/ErrorHandlerMiddleware'
// const models = require('./models/models')
import * as models from './models/models'
import { router } from './routes'

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '..', 'static')))
app.use(fileUpload())
app.use(cors())
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`App started at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

start()
