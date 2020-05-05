import { Router } from 'express';

import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.route('/').post(usersController.create);

usersRouter
  .route('/avatar')
  .all(ensureAuthenticated, upload.single('avatar'))
  .patch(userAvatarController.update);

export default usersRouter;
