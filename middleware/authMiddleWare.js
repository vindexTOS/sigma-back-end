import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import AuthModel from '../moduls/AuthModel.js'
config()
const verifyToken = async (token, res) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_STRING)

    const userId = decoded.user._id

    const user = await AuthModel.findById(userId)

    if (!user) {
      return res.status(401).json({ msg: 'Premssision denied' })
    }

    return user
  } catch (error) {
    return res.status(401).json({ msg: 'Token Is Not Valid' })
  }
}

export const authUserMiddleware = async (req, res, next) => {
  const token = req?.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ msg: 'No Token , Authoriszation denied' })
  }

  const user = await verifyToken(token, res)

  if (!user) {
    return res.status(401).json({ msg: 'Invalid Token' })
  }

  req.user = user

  next()
}

export const authAdminMiddleware = async (req, res, next) => {
  const token = req?.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ msg: 'No Token' })
  }

  const user = await verifyToken(token, res)

  if (!user) {
    return res.status(401).json({ msg: 'Invalid Token' })
  }

  if (user.role !== 'admin') {
    return res.status(404).json({ msg: 'Premission denied' })
  }
  req.user = user
  next()
}
