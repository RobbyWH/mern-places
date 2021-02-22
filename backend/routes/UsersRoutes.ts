import express from 'express';
import {
  getUsers,
  signup,
  login
} from '../controllers/UsersControllers';
import { check } from 'express-validator';

const router = express.Router();

router.get('/', getUsers);

router.post('/signup',
[
  check('name')
    .not()
    .isEmpty(),
  check('email')
    .normalizeEmail()
    .isEmail(),
  check('name')
    .isLength({min: 5})
],
signup);

router.post('/login', login);

export default router;

