import { Router } from 'express';
import AttendanceController from './attendance.controller';

const attendanceRouter = Router();

attendanceRouter.get('/', AttendanceController.getAllEmployeesAttendance);

attendanceRouter.post('/entry', AttendanceController.signin);
attendanceRouter.post('/exit', AttendanceController.signout);

attendanceRouter.get('/today', AttendanceController.getTodaysAttendance);

export default attendanceRouter;