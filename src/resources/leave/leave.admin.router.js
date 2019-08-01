import { Router } from 'express';
import AdminLeaveController from './leave.admin.controller';
import bodyParser from 'body-parser';


const AdminLeaveRouter = Router();
AdminLeaveRouter.use(bodyParser.urlencoded({ extended: true }));
AdminLeaveRouter.use(bodyParser.json())

AdminLeaveRouter.patch('/accept/:id', AdminLeaveController.acceptRequest); // leave id
AdminLeaveRouter.patch('/decline/:id', AdminLeaveController.declineRequest); // leave id
AdminLeaveRouter.get('/', AdminLeaveController.getLeaves);



export default AdminLeaveRouter;