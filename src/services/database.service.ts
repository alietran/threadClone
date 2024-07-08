import dotenv from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import User from '~/models/schemas/User.schema'

dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.exigfbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      console.log('error', err)
      throw err
    }
  }

  get users(): Collection<User> {
    return this.db.collection('users')
  }
}

const databaseService = new DatabaseService()
export default databaseService
