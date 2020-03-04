import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import AppointmentController from './app/controllers/AppointmentController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import validateSessionStore from './app/validators/SessionStore';
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateAppointmentStore from './app/validators/AppointmentStore';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
	host: process.env.REDIS_HOST,
	post: process.env.REDIS_PORT,
});
const bruteForce = new Brute(bruteStore);

routes
	.route('/users')
	.post(validateUserStore, UserController.store)
	.put(authMiddleware, validateUserUpdate, UserController.update);

routes.post(
	'/sessions',
	bruteForce.prevent,
	validateSessionStore,
	SessionController.store
);

routes.post('/files', upload.single('file'), FileController.store);
routes.post('/files', upload.single('file'), FileController.store);

routes.route('/providers').post(ProviderController.index);
routes.route('/providers/:providerId/available').get(AvailableController.index);

routes.route('/schedule').get(authMiddleware, ScheduleController.index);

routes
	.route('/appointments')
	.get(authMiddleware, AppointmentController.index)
	.post(authMiddleware, validateAppointmentStore, AppointmentController.store);
routes
	.route('/appointments/:id')
	.delete(authMiddleware, AppointmentController.delete);
	
routes
	.route('/notifications')
	.get(authMiddleware, NotificationController.index);
routes.route('/notifications/:id').put(NotificationController.update);
module.exports = routes;
