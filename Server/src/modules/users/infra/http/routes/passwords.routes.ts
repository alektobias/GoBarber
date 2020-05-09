import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passworRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passworRouter.route('/forgot').post(forgotPasswordController.create);
passworRouter.route('/reset').post(resetPasswordController.create);

export default passworRouter;
