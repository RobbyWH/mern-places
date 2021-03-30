import express from 'express';
import {
  getPlacesByUserId,
  getPlaceById,
  createPlace,
  updatePlaceById,
  deletePlace
} from '../controllers/PlacesControllers';
import { check } from 'express-validator';
import fileUpload from '../middleware/fileUpload';

const router = express.Router();

router.get('/:pid', getPlaceById);

router.get('/user/:uid', getPlacesByUserId);

router.post('/',
  fileUpload.single('image'),
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

