import { Router } from 'express';
import EmployeeController from './employee.controller';
import verifyAuth from '../../middlewares/verifyAuth';
import verifyAdmin from '../../middlewares/verifyAdmin';

const employeeRouter = Router();

// only an admin can access this route
employeeRouter.post('/', verifyAuth, verifyAdmin, EmployeeController.signup);
employeeRouter.get('/', verifyAuth, EmployeeController.getEmployees);

employeeRouter.post('/login', EmployeeController.login);

employeeRouter.get('/:employeeId', verifyAuth, EmployeeController.getEmployee);
employeeRouter.delete('/:employeeId', verifyAuth, EmployeeController.removeEmployee);

employeeRouter.get('/:employeeId/leaves', verifyAuth, EmployeeController.getEmployeeLeaves);

export default employeeRouter;