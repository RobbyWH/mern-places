import {Request, Response, NextFunction} from 'express';
import HttpError from '../models/HttpError';
import { v4 as uuidv4 } from 'uuid';

interface CreatedPlaceData {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  },
  address: string;
  creator: string;
};

interface PatchedPlaceData {
  // id?: string;
  title?: string;
  description?: string;
  location?: {
    lat: number;
    lng: number;
  },
  address?: string;
  creator?: string;
};

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in thee world!',
    location: {
      lat: 40.74922,
      lng: -73.98545
    },
    address: '20 W 34th St, New York, NY 10001, United States',
    creator: 'u1'
  }
];

export const getPlaceById = (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(place => placeId === place.id);
  
  if (!place) {
    const error = new HttpError('could not find a place for the provided id', 404);
    return next(error);
  } 

  res.json({
    place
  });
};

export const getPlaceByUserId = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find(place => place.creator === userId)

  if (!place) {
    const error = new HttpError('could not find a place for the provided user id', 404);
    return next(error);
  } 
  res.json({
    place
  });
};

export const createPlace = (req: Request, res: Response) => {
  const {
    title,
    description,
    location,
    address,
    creator
  } = req.body;

  const createdPlace: CreatedPlaceData = {
    id: uuidv4(),
    title,
    description,
    location,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({place: createdPlace});
};

export const updatePlaceById = (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    description,
  } = req.body;
  const placeId = req.params.pid;

  const updatedPlace: PatchedPlaceData = {...DUMMY_PLACES.find(place => place.id === placeId)};
  const placeIndex = DUMMY_PLACES.findIndex(place => place.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  // @ts-expect-error
  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({place: updatedPlace});
}

export const deletePlace = (req: Request, res: Response, next: NextFunction) => {

}