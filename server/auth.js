import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_EXPIRES_IN = '7d'

export function hashPassword(password) {
  return bcrypt.hash(password, 10)
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

export function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment')
  }

  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  )
}

export function verifyToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment')
  }
  return jwt.verify(token, process.env.JWT_SECRET)
}
