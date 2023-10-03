import ReviewsModel from '../moduls/ReviewsModel.js'
import AuthModel from '../moduls/AuthModel.js'
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
  const { userId, comment, rate, userName } = req.body
  const { movieId } = req.params
   try {
    const updatedMovie = await ReviewsModel.findOneAndUpdate(
      { movieId },
      { $push: { review: { userId, comment, rate, userName } } },
      { new: true },
    )

    if (!updatedMovie) {
      return res.status(400).json({ msg: 'Movie not found' })
    }

    return res.status(200).json({ msg: 'Review created successfully' })
  } catch (error) {
    return res
      .status(500)
      .json({ msg: 'Internal Server Error', error: error.message })
  }
}
