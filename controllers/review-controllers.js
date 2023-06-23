import ReviewsModel from '../moduls/ReviewsModel.js'

export const getReviews = async (req, res) => {
  let { movieId } = req.params
  movieId = movieId.replace('\n', '')

  try {
    const comments = await ReviewsModel.findOne({ movieId })

    return res.status(200).json(comments)
  } catch (error) {
    return res.status(500).json({ msg: 'server error', error: error.message })
  }
}
export const CreateReview = async (req, res) => {
  const { userId, comment, rate } = req.body
  let { movieId } = req.params
  movieId = movieId.replace('\n', '')
  try {
    const movie = await ReviewsModel.findOne({ movieId })
    if (!movie) {
      return res.status(400).json({ msg: 'Movie not found' })
    }

    const existingReview = movie.review.find(
      (review) => review.userId === userId,
    )
    if (existingReview) {
      return res.status(400).json({ msg: 'You already made a review' })
    }

    movie.review.push({ userId, comment, rate })
    await movie.save()

    return res.status(200).json({ msg: 'Review created successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message })
  }
}
