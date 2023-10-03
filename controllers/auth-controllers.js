import AuthModel from '../moduls/AuthModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const Register = async (req, res) => {
  const { username, password } = req.body
  const userExist = await AuthModel.findOne({ username: username })
  if (userExist) {
    return res.status(400).json({ msg: 'Email Already Exists' })
  }

  const Hasshedpassword = await bcrypt.hash(password, 10)
 
  if (password && username) {
    await AuthModel.create({ username, password: Hasshedpassword })
  } else {
    return res.status(201).json({ msg: 'Enter All The Values' })
  }

  const userFromDb = await AuthModel.findOne({ username: username })
  userFromDb.password = null
 
  const token = jwt.sign({ user: userFromDb }, process.env.JWT_STRING, {
    expiresIn: '1h',
  })

  if (userFromDb) {
    return res.status(201).json({ token, user: userFromDb })
  } else if (!userFromDb) {
    return res.status(201).send({ msg: 'Try To Sign In' })
  }

  return res.status(200).json({ msg: 'User Registered' })
}

export const Login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await AuthModel.findOne({ username: username })

    if (!user) {
      return res.status(400).json({ msg: 'Email not registered' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Password wrong' })
    }

    user.password = null
    const token = jwt.sign({ user }, process.env.JWT_STRING, {
      expiresIn: '1h',
    })

    res.set('Authorization', `Bearer ${token}`)
    return res.status(200).json({ token, user })
  } catch (error) {
     return res.status(500).json({ msg: 'Internal server error' })
  }
}
