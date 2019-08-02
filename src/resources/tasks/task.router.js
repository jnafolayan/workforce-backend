import { Router } from 'express';
import TaskController from './task.controller';
import verifyAuth from '../../middlewares/verifyAuth';

const taskRouter = Router();

taskRouter.post('/', verifyAuth, TaskController.createTask);
taskRouter.get('/', verifyAuth, TaskController.getAllTasks);

taskRouter.get('/:taskId', verifyAuth, TaskController.getTask);
taskRouter.patch('/:taskId/complete', verifyAuth, TaskController.completeTask);
taskRouter.patch('/:taskId/close', verifyAuth, TaskController.closeTask);
taskRouter.patch('/:taskId/open', verifyAuth, TaskController.openTask);
