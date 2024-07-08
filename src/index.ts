import express from 'express'
import userRouter from './routes/users.router'
import databaseService from './services/database.service'

const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

databaseService.connect()

app.use(express.json())

app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
