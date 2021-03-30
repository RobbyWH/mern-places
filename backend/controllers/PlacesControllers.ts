import {Request, Response, NextFunction} from 'express';
import HttpError from '../models/HttpError';
import {validationResult} from 'express-validator';
import {getCoordsForAddress} from '../util/location';
import Place, {PlaceInterface} from '../models/Place'
import User from '../models/User'
import mongoose from 'mongoose';
import fs from 'fs';

export const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again alter',
      500
    );
    return next(error);
  }
  
  if (!place) {
    const error = new HttpError(
      'could not find a place for the provided id',
      404
    );
    return next(error);
  } 

  res.json({
    place: place.toObject({
      getters: true
    })
  });
};

export const getPlacesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate('places');
  } catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

   // @ts-expect-error
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    const error = new HttpError(
      'could not find a places for the provided user id',
      404
    );
    return next(error);
  } 

  res.json({
    // @ts-expect-error
    places: userWithPlaces.places.map(place => place.toObject({ getters: true }))
  });
};

export const createPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed', 422);
    return next(error);
  }

  const {
    title,
    description,
    address,
    creator
  } = req.body;

  let location;
  try {
    location = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }
  const createdPlaceData: PlaceInterface = {
    title,
    description,
    address,
    location,
    image: req.file.path,
    creator
  };
  const createdPlace = new Place(createdPlaceData);

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    // @ts-expect-error
    user.places.push(createdPlace);
    await user.save({ session: sess })
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Creating place failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({place: createdPlace});
};

export const updatePlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed', 422);
    return next(error);
  }

  const {
    title,
    description,
  } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch(err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      'could not find a place',
      404
    );
    return next(error);
  } 

  // @ts-expect-error
  place.title = title;
  // @ts-expect-error
  place.description = description;

  try {
    await place.save();
  } catch(err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  res.status(200).json({
    place: place.toObject({
      getters: true
    })
  });
}

export const deletePlace =  async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      'could not find a place',
      404
    );
    return next(error);
  } 
  
  // @ts-expect-error
  const imagePath = place.image || '';
  
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    // @ts-expect-error
    place.creator.places.pull(place)
    // @ts-expect-error
    await place.creator.save({ session: sess })
    await sess.commitTransaction();
  } catch(err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });

  res.status(200).json({
    message: 'Deleted place.'
  });
};