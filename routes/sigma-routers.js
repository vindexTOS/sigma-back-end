import express from 'express'
import {
  getAllMovies,
  PostMovie,
  updateMovie,
  deleteMovie,
} from '../controllers/sigma-controller.js'
import {
  MakeActor,
  GetActors,
  DeleteActor,
  UpdateActor,
} from '../controllers/actor-controllers.js'
import { getReviews, CreateReview } from '../controllers/review-controllers.js'
import { authAdminMiddleware } from '../middleware/authMiddleWare.js'
const router = express.Router()
// actors
router.route('/v1/Actors/GetAllActors').get(GetActors)
router.route('/v1/Actors/AddActor').post(authAdminMiddleware, MakeActor)
router
  .route('/v1/Actors/CRUD/:id')
  .delete(authAdminMiddleware, DeleteActor)
  .patch(authAdminMiddleware, UpdateActor)
//movies
router.route('/v1/Movies/GetAllMovies').get(getAllMovies)
router.route('/v1/Movies/AddMovie').post(authAdminMiddleware, PostMovie)
router
  .route('/v1/Movies/UpdateMovie/:id')
  .patch(authAdminMiddleware, updateMovie)
router.route('/v1/Movies/DeleteMovie/:id').delete(deleteMovie)
//reviews
router.route('/v1/Movies/Reviews/:movieId').get(getReviews).patch(CreateReview)

export default router
