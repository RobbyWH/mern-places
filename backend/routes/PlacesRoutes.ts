import express from 'express';
import {
  getPlacesByUserId,
  getPlaceById,
  createPlace,
  updatePlaceById,
  deletePlace
} from '../controllers/PlacesControllers';
import { check } from 'express-validator';

const router = express.Router();

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlacesByUserId);

router.post('/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('description')
      .isLength({min: 5}),
    check('address')
      .not()
      .isEmpty()
  ],
  createPlace
);

router.patch('/:pid',
[
  check('title')
    .not()
    .isEmpty(),
  check('description')
    .isLength({min: 5}),
], 
updatePlaceById);

router.delete('/:pid', deletePlace);

export default router;

