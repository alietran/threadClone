import { Collection } from 'mongodb'
import { RefreshToken } from '~/models/schemas/refreshToken.schema'
import { User } from '~/models/schemas/users.schema'

const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@threadcluster.agffpyo.mongodb.net/?retryWrites=true&w=majority&appName=threadCluster`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// export async function databaseService() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect()
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 })
//     console.log('Pinged your deployment. You successfully connected to MongoDB!')
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close()
//   }
// }
class DatabaseService {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })
  constructor() {}

  async connect() {
    await this.client.connect()
    // Send a ping to confirm a successful connection
    await this.client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  }

  get users(): Collection<User> {
    return this.client.db.collection('users')
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.client.db.collection('refresh_token')
  }
}
const databaseService = new DatabaseService()
export default databaseService
