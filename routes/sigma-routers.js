import express from 'express'
import {
  getAllMovies,
  PostMovie,
  updateMovie,
} from '../controllers/sigma-controller.js'
import { MakeActor, GetActors } from '../controllers/actor-controllers.js'
import { authAdminMiddleware } from '../middleware/authMiddleWare.js'
const router = express.Router()

router.route('/v1/Movies/GetAllMovies').get(getAllMovies)
router.route('/v1/Actors/GetAllActors').get(GetActors)
router.route('/v1/Movies/AddMovie').post(authAdminMiddleware, PostMovie)
router.route('/v1/Actors/AddActor').post(authAdminMiddleware, MakeActor)
router
  .route('/v1/Movies/UpdateMovie/:id')
  .patch(authAdminMiddleware, updateMovie)
export default router
