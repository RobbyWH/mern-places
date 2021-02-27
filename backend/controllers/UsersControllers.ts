import {Request, Response, NextFunction} from 'express';
import HttpError from '../models/HttpError';
import {validationResult} from 'express-validator';
import User, {UserInterface} from '../models/User'

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }
  res.json({ 
    users: users.map(user => user.toObject({
      getters: true
    }))
  })
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed', 422);
    return next(error);
  }

  const {name, email, password} = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('Could not create user, email already exist', 422);
    return next(error);
  }
  const createdUserData: UserInterface = {
    name,
    email,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg',
    password,
    places: []
  };

  const createdUser = new User(createdUserData);

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing Up failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {email, password} = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }
  // @ts-expect-error
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError('Could not identity user, credentials seem to be wrong', 401);
    return next(error);
  }

  res.json({
    messagee: 'Logged in!',
    user: existingUser.toObject({getters: true})
  });

};