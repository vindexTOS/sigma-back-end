import express from 'express'
import { Register, Login } from '../controllers/auth-controllers.js'
const authRouter = express.Router()

authRouter.route('/Register').post(Register)
authRouter.route('/LogIn').post(Login)

export default authRouter
