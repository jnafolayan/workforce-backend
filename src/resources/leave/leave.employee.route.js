import { Router } from 'express';
import LeaveController from './leave.employee.controller';
import bodyParser from 'body-parser';


const EmployeeLeaveRouter = Router();
EmployeeLeaveRouter.use(bodyParser.urlencoded({ extended: true }));
EmployeeLeaveRouter.use(bodyParser.json())

EmployeeLeaveRouter.get('/:id', LeaveController.getEmployeeLeaves); // needs user id
EmployeeLeaveRouter.post('/request/:id', LeaveController.requestForLeave); // needs user id


export default EmployeeLeaveRouter;