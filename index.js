import express from 'express'
import connectDB from './contact/connectDB.js'
import { config } from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import route from './routes/sigma-routers.js'
import authRouter from './routes/auth-routers.js'
config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use('/', route)
app.use('/api/Authorization', authRouter)
const port = 5119

const start = async () => {
  await connectDB(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`port is listining  ${port}`)
  })
}

start()
