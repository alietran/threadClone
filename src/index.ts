import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middleware'
import authRouter from './routes/auth.routes'
import databaseService from './services/database.service'

const app = express()
const port = 3001

databaseService.connect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user', authRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
