import { Router } from 'express';
import taskController from './task.controller';


const taskRouter = Router();

taskRouter.post('/:id',taskController.validate('addTask'),taskController.addTask);

taskRouter.get('/find/:query',taskController.getTasks);

taskRouter.post('/delete/:id',taskController.deleteTask)

taskRouter.post('/update/:id',taskController.updateTask);

taskRouter.post('/assign/:id',taskController.assignTask);


export default taskRouter;