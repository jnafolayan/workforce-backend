import express from 'express';
import { Router } from 'express';
import adminRouter from './resources/admin/admin.router';
import taskRouter from './resources/task/routes';
import path from 'path';

export function setup() {
  const apiRouter = Router();
  
apiRouter.use(express.json())
apiRouter.use(express.urlencoded({extended:false}))
  // add api routes here
apiRouter.use('/admin', adminRouter);
apiRouter.use('/task',taskRouter)
apiRouter.use('/',express.static(path.resolve(__dirname,'public')))

  return apiRouter;
}