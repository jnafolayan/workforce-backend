import { Router } from 'express';
import adminRouter from './resources/admin.router';

export function setup() {
  const apiRouter = Router();

  // add api routes here
  apiRouter.use('/admin', adminRouter);

  return apiRouter;
}