import {Request, Response, NextFunction} from 'express';
import { v4 as uuidv4 } from 'uuid';
import HttpError from '../models/HttpError';
import {validationResult} from 'express-validator';

interface CreatedUserData {
  id: string;
  name: string;
  email: string;
  password: string;
};

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Robby WH',
    email: 'test@test.com',
    password: 'testers'
  }
]
export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  res.json({ users: DUMMY_USERS })
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed', 422);
    return next(error);
  }

  const {name, email, password} = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email)
  if (hasUser) {
    const error = new HttpError('Could not create user, email already exist', 422);
    return next(error);
  }
  const createdUser: CreatedUserData = {
    id: uuidv4(),
    name,
    email,
    password
  }
  DUMMY_USERS.push(createdUser);
  res.status(201).json({user: createdUser});
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  const identifiedUser = DUMMY_USERS.find(u => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    const error = new HttpError('Could not identity user, credentials seem to be wrong', 401);
    return next(error);
  }

  res.json({messagee: 'Loggeed in!'});

};