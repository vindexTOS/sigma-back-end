import mongoose from 'mongoose'

const actorSchema = new mongoose.Schema({
  img: {
    type: String,
    requried: true,
  },
  name: {
    type: String,
    requried: true,
  },
})

export default mongoose.model('sigma-actor', actorSchema)
