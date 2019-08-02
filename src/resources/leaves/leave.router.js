import { Router } from 'express';
import LeaveController from './leave.controller';
import verifyAuth from '../../middlewares/verifyAuth';

const leaveRouter = Router();

leaveRouter.post('/', LeaveController.requestForLeave);
leaveRouter.get('/', LeaveController.getAllLeaves);

leaveRouter.get('/:leaveId', LeaveController.getLeave);

leaveRouter.patch('/:leaveId/accept', LeaveController.acceptLeave);
leaveRouter.patch('/:leaveId/decline', LeaveController.declineLeave); 

export default leaveRouter;