import { Router } from 'express';
import multer from 'multer';
import EmployeeController from './employee.controller';
import verifyAuth from '../../middlewares/verifyAuth';
import verifyAdmin from '../../middlewares/verifyAdmin';

const employeeRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// only an admin can access this route
employeeRouter.post(
  '/', 
  verifyAuth, 
  verifyAdmin, 
  upload.fields(['cv', 'profile']), 
  EmployeeController.createEmployee
);
employeeRouter.get('/', EmployeeController.getEmployees);

employeeRouter.post('/login', EmployeeController.login);

employeeRouter.get('/:employeeId', EmployeeController.getEmployee);
employeeRouter.patch('/:employeeId', verifyAuth, verifyAdmin, EmployeeController.updateEmployee);
employeeRouter.delete('/:employeeId', verifyAuth, verifyAdmin, EmployeeController.removeEmployee);

employeeRouter.get('/:employeeId/leaves', verifyAuth, EmployeeController.getEmployeeLeaves);
employeeRouter.get('/:employeeId/tasks', verifyAuth, EmployeeController.getEmployeeTasks);

export default employeeRouter;