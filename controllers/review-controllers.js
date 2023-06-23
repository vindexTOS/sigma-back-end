import ReviewsModel from '../moduls/ReviewsModel.js'

export const getReviews = async (req, res) => {
  const { movieId } = req.params

  try {
    const comments = await ReviewsModel.findOne(movieId)

    return res.status(200).json(comments)
  } catch (error) {
    return res.status(500).json({ msg: 'server error' })
  }
}
