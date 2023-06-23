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
        default: 5,
      },
      userId: {
        type: String,
      },
    },
  ],
})

export default mongoose.model('review-comment', ReviewsSchema)
