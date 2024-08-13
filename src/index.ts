import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middleware'
import userRouter from './routes/auth.routes'
import databaseService from './services/database.service'

const app = express()
const port = 3001

databaseService.connect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

databaseService.connect()

app.use(express.json())

//Xử lý error handler phải nhận về 4 tham số

app.use('/api/user', userRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
