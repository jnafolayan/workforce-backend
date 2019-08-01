import { Router } from 'express';
import taskController from './task.controller';


const taskRouter = Router();

taskRouter.post('/add',taskController.addTask);

 taskRouter.get('/find/:query', taskController.getTasks); 
 
 taskRouter.post('/delete/:id',
 taskController.deleteTask) 
 
 
 taskRouter.post('/update/:id',taskController.updateTask); 
 taskRouter.post('/assign/:id', taskController.assignTask);
 
 taskRouter.get('/close/:id',taskController.closeTask); 
 
 taskRouter.get('/finish/:id',taskController.finishTask); 

//taskRouter.get('/setQuality/:id',taskController.setQuality)

export default taskRouter;