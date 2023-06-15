import MoviesModel from '../moduls/MoviesModel.js'
import AuthModel from '../moduls/AuthModel.js'
export const getAllMovies = async (req, res) => {
  const PageNumber = req.query.PageNumber
  const PageSize = req.query.PageSize
  const sortBy = req.query.sortBy
  const genre = req.query.genre
  const year = req.query.year
  try {
    const movies = await MoviesModel.find({})

    return res.status(200).json({ data: movies })
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Error' })
  }
}

export const PostMovie = async (req, res) => {
  const {
    title,
    color,
    color2,
    img,
    video,
    description,
    actors,
    rating,
    metadata,
    userId,
  } = req.body
  try {
    const userExist = await AuthModel.findOne({ _id: userId })
    if (!userExist) {
      return res.status(404).json({ msg: 'Premission denied' })
    }

    if (title && userId && description && img) {
      await MoviesModel.create(req.body)
      return res.status(200).json({ msg: 'movie added' })
    } else {
      return res.status(400).jsno({ msg: 'input all the field' })
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Error' })
  }
}
