import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void
    ) => {
      callback(null, 'uploads/images')
    },
    filename: (
      req: Express.Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void
    ) => {
      // @ts-expect-error
      const ext = MIME_TYPE_MAP[file.mimetype];
      callback(null, `${uuidv4()}.${ext}`)
    }
  }),
  fileFilter: (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, isValid?: boolean) => void
  ) => {
     // @ts-expect-error
    const isValid = !!MIME_TYPE_MAP[file.mimetype]
    let error = isValid ? null : new Error('Invalid mime type!');
    callback(error, isValid)
  }
});

export default fileUpload;