import mongoose from 'mongoose'

const MoviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  color2: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    required: true,
    trim: true,
  },
  video: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    requried: true,
    trim: true,
  },
  actors: [
    {
      name: {
        type: String,
        trim: true,
      },
      img: {
        type: String,
      },
    },
  ],
  rating: {
    IMDb: Number,
    RottenTomatos: Number,
  },
  // quote: {
  //   type: String,
  //   trim: true,
  // },
  metadata: {
    hr: String,
    year: Number,
    genre: String,
  },
  userId: {
    type: String,
    required: true,
  },
})

export default mongoose.model('sigma-movie', MoviesSchema)
