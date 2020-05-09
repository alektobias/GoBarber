import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder: tmpPath,
  uploadsFolder: path.resolve(tmpPath, 'uploads'),
  storage: multer.diskStorage({
    destination: tmpPath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
