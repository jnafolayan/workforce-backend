import { Router } from 'express';
import EmployeeController from './employee.controller';
import verifyAuth from '../../middlewares/verifyAuth';
import verifyAdmin from '../../middlewares/verifyAdmin';

const employeeRouter = Router();

// only an admin can access this route
employeeRouter.post('/', verifyAuth, verifyAdmin, EmployeeController.signup);
employeeRouter.get('/', EmployeeController.getEmployees);

employeeRouter.post('/login', EmployeeController.login);

employeeRouter.get('/:employeeId', EmployeeController.getEmployee);
employeeRouter.patch('/:employeeId', verifyAuth, verifyAdmin, EmployeeController.updateEmployee);
employeeRouter.delete('/:employeeId', verifyAuth, verifyAdmin, EmployeeController.removeEmployee);

employeeRouter.get('/:employeeId/leaves', verifyAuth, EmployeeController.getEmployeeLeaves);
employeeRouter.get('/:employeeId/tasks', verifyAuth, EmployeeController.getEmployeeTasks);

export default employeeRouter;