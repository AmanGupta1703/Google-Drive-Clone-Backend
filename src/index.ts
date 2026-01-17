import dotenv from 'dotenv'

dotenv.config({
  path: './.env',
})

import { app } from './app.js'
import connectDB from './db/index.js'
import config from './config/index.js'

connectDB()
  .then(() => {
    app.listen(config.port || 8000, () => {
      console.log(`Server is running at port : htpp://localhost:${config.port}`)
    })
  })
  .catch((err) => {
    console.log('MONGO db connection failed !!! ', err)
  })
