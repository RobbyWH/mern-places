import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('GET Request in Places');
  res.json({
    message: 'It works'
  });
});

export default router;

