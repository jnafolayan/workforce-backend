import { Router } from 'express';
import AdminController from './admin.controller';

const adminRouter = Router();

adminRouter.post('/', AdminController.registerAdmin);
adminRouter.post('/login', AdminController.loginAdmin);

export default adminRouter;