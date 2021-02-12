import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import placesRoutes from './routes/PlacesRoutes'
import HttpError from './models/HttpError';

interface Error {
  code?: number;
  message?: string;
};

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError('Could not find this route.', 404);
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occured'
  });
});

app.listen(5000);