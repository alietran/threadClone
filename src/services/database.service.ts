import dotenv from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User from '~/models/schemas/User.schema'

dotenv.config()
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.exigfbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(url)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      throw err
    }
  }

  get users(): Collection<User> {
    return this.db.collection('users')
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection('refresh_token')
  }
}

const databaseService = new DatabaseService()
export default databaseService
