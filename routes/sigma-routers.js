import express from 'express'
import { getAllMovies, PostMovie } from '../controllers/sigma-controller.js'

const router = express.Router()

router.route('/v1/Movies/GetAllMovies').get(getAllMovies)
router.route('/v1/Movies/AddMovie').post(PostMovie)
export default router
