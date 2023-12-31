import mongoose from 'mongoose'

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'critic',
  },
})

export default mongoose.model('movie-user', AuthSchema)
