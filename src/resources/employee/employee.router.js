import { Router } from 'express';
import EmployeeController from './employee.controller';
import bodyParser from 'body-parser';


const employeeRouter = Router();
employeeRouter.use(bodyParser.urlencoded({ extended: true }));
employeeRouter.use(bodyParser.json())

employeeRouter.post('/', EmployeeController.EmployeeSignup);
employeeRouter.post('/login', EmployeeController.EmployeeLogin);
employeeRouter.post('/logout',EmployeeController.employeeLogout);
employeeRouter.get('/all',EmployeeController.getEmployees)

employeeRouter.get('/:id', EmployeeController.getASingleEmployee)

export default employeeRouter;