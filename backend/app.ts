import express, {Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

import placesRoutes from './routes/PlacesRoutes'
import usersRoutes from './routes/UsersRoutes'
import HttpError from './models/HttpError';

interface Error {
  code?: number;
  message?: string;
};

const app = express();

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'http://localhost:3000',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE'
  );
  next();
});

console.log(path.join('uploads', 'images'))

app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError('Could not find this route.', 404);
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occured'
  });
});

mongoose
  .connect('mongodb+srv://robbywh:p@ssw0rd@cluster0.32opw.mongodb.net/mern?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
