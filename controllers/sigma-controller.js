import MoviesModel from '../moduls/MoviesModel.js'
import AuthModel from '../moduls/AuthModel.js'
import ActorsModel from '../moduls/ActorsModel.js'
import ReviewsModel from '../moduls/ReviewsModel.js'
export const getAllMovies = async (req, res) => {
  const sortBy = req.query.sortBy
  const genre = req.query.genre
  const year = req.query.year
  const PageNumber = parseInt(req.query.PageNumber) || 1
  const PageSize = parseInt(req.query.PageSize) || 8
  const startIndex = (PageNumber - 1) * PageSize
  const endIndex = PageNumber * PageSize
  let sortQuery = {}

  if (sortBy) {
    if (sortBy === 'Year') {
      sortQuery = { 'metadata.year': -1 }
    } else if (sortBy === 'IMDb') {
      sortQuery = { 'rating.IMDb': -1 }
    } else if (sortBy === 'RottenTomatoes') {
      sortQuery = { 'rating.RottenTomatoes': -1 }
    }
  }

  let query = {}

  if (genre) {
    const filteredGenres = new RegExp(genre, 'i')
    query['metadata.genre'] = { $regex: filteredGenres }
    sortQuery = { 'metadata.genre': 1 }
  }
  console.log(query)
  if (year) {
    query['metadata.year'] = year
  }

  try {
    const TotalMovies = await MoviesModel.countDocuments(query)
    const TotalPages = Math.ceil(TotalMovies / PageSize)
    let movies = await MoviesModel.find(query)
      .sort(sortQuery)
      .skip(startIndex)
      .limit(PageSize)
    movies.reverse()
    return res.status(200).json({ data: movies, TotalPages, TotalMovies })
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Error' })
  }
}

export const PostMovie = async (req, res) => {
  const { title, img, description, userId } = req.body
  try {
    const userExist = await AuthModel.findOne({ _id: userId })
    if (!userExist) {
      return res.status(404).json({ msg: 'Premission denied' })
    }

    const isMovieExists = await MoviesModel.findOne({ title: title })
    if (isMovieExists) {
      return res.status(400).json({ msg: 'Movie Already Exists' })
    }

    if (title && userId && description && img) {
      await MoviesModel.create(req.body)

      const movieId = await MoviesModel.findOne({ title: title })

      await ReviewsModel.create({ movieId: movieId._id })

      return res.status(200).json({ msg: 'movie added' })
    } else {
      return res.status(400).jsno({ msg: 'input all the field' })
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Error' })
  }
}

export const updateMovie = async (req, res) => {
  const { id } = req.params

  try {
    const isMovieExit = await MoviesModel.findById({ _id: id })
    if (!isMovieExit) {
      return res.status(400).json({ msg: 'No Such Movie Exists' })
    }

    const Movie = await MoviesModel.findByIdAndUpdate(id, req.body)

    return res.status(200).json({ msg: 'succsessful' })
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error 500' })
  }
}

export const deleteMovie = async (req, res) => {
  const { id } = req.params

  try {
    await MoviesModel.findByIdAndDelete({ _id: id })
    return res.status(200).json({ msg: 'Movie has been deleted' })
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' })
  }
}
