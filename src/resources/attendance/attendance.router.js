import { Router } from 'express';
import AttendanceController from './attendance.controller';
import verifyAuth from '../../middlewares/verifyAuth';

const attendanceRouter = Router();

attendanceRouter.get('/', verifyAuth, AttendanceController.getAllEmployeesAttendance);

attendanceRouter.post('/entry', verifyAuth, AttendanceController.signin);
attendanceRouter.post('/exit', verifyAuth, AttendanceController.signout);

attendanceRouter.get('/today', verifyAuth, AttendanceController.getTodaysAttendance);

export default attendanceRouter;