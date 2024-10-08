import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
config()
export const signToken = ({
  payload,
  privateKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: any
  privateKey: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        reject(error)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decode) => {
      if (error) {
        throw reject(error)
      }
      resolve(decode as jwt.JwtPayload)
    })
  })
}
