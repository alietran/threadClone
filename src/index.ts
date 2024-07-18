import express from 'express'
import { defaultErrorHandler } from './middlewares/error.middleware'
import userRouter from './routes/users.routes'
import databaseService from './services/database.service'

const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

databaseService.connect()

app.use(express.json())

//Xử lý error handler phải nhận về 4 tham số
app.use(defaultErrorHandler)

app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
