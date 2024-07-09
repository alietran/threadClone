import { TokenType } from '~/constants/enums'
import { RegisterDTO } from '~/models/schemas/dto/user.dto'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import databaseService from './database.service'

class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  async register(payload: RegisterDTO) {
    //REGISTER MANY USERS AT ONCE TIME
    //   const payload1 = [
    //     { email: 'Billy', password: '21' },
    //     { email: 'Alaric', password: '24' }
    //   ]
    //   const users = payload1.map((item) => new User({ email: item.email, password: item.password }))

    //   const result = await databaseService.users.insertMany(users)
    //   return result
    // }

    const result = await databaseService.users.insertOne(
      new User({ ...payload, date_of_birth: new Date(payload.date_of_birth), password: hashPassword(payload.password) })
    )

    const user_id = result.insertedId.toString()
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return { accessToken, refreshToken }
  }

  async emailExisted(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
}
const userService = new UsersService()
export default userService
