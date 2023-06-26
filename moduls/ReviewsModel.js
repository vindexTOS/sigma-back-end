import mongoose from 'mongoose'

const ReviewsSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  review: [
    {
      comment: {
        type: String,
      },
      rate: {
        type: Number,
      },
      userId: {
        type: String,
      },
      userName: {
        type: String,
      },
    },
  ],
})

export default mongoose.model('review-comment', ReviewsSchema)
