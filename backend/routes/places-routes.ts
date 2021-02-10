import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

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

router.get('/:pid', (req: Request, res: Response, next: NextFunction) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(place => placeId === place.id);
  res.json({
    place
  });
});

export default router;

