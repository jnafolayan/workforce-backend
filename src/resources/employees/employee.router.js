import { Router } from 'express';
import EmployeeController from './employee.controller';

const employeeRouter = Router();

employeeRouter.post('/', EmployeeController.signup);
employeeRouter.get('/',EmployeeController.getEmployees);

employeeRouter.post('/login', EmployeeController.login);

employeeRouter.get('/:employeeId', EmployeeController.getEmployee);
employeeRouter.delete('/:employeeId', EmployeeController.removeEmployee);

employeeRouter.get('/:employeeId/leave', EmployeeController.getEmployeeLeaves);

export default employeeRouter;