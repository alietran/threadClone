import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { TokenType } from '~/constant/enum'
import { UserRegisterDTO } from '~/models/dto/UserRegister.dto'
import { RefreshToken } from '~/models/schemas/refreshToken.schema'
import { User } from '~/models/schemas/users.schema'
import { hashPassword } from '~/utils/crypto'
import { signToken } from './../utils/jwt'
import databaseService from './database.service'
config()
class AuthService {
  async register(userInfoDTO: UserRegisterDTO) {
    const newUser = await databaseService.users.insertOne(
      new User({
        ...userInfoDTO,
        date_of_birth: new Date(userInfoDTO.date_of_birth),
        password: hashPassword(userInfoDTO.password)
      })
    )
    const user_id = newUser.insertedId.toString()
    const [accessToken, refreshToken] = await this.generateToken(user_id)

    await databaseService.refreshToken.insertOne(
      new RefreshToken({
        token: refreshToken,
        user_id: new ObjectId(user_id)
      })
    )
  }

  async generateToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.refreshToken(user_id)])
  }

  signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  refreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  async emailExisted(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
}

const authService = new AuthService()
export default authService
