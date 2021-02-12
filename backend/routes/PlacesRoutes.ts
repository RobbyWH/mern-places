import express from 'express';
import {
  getPlaceByUserId,
  getPlaceById,
  createPlace,
  updatePlaceById,
  deletePlace
} from '../controllers/PlacesControllers';

const router = express.Router();

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlaceByUserId);

router.post('/', createPlace)

router.patch('/:pid', updatePlaceById)

router.delete('/:pid', deletePlace)

export default router;

