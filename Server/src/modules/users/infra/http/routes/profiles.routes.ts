import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profilesRouter = Router();

const profileController = new ProfileController();

profilesRouter
  .route('/')
  .all(ensureAuthenticated)
  .put(profileController.update);

export default profilesRouter;
