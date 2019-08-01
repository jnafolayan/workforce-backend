import { Router } from 'express';
import AttendanceController from './attendance.controller';
import bodyParser from 'body-parser';


const attendanceRouter = Router();
attendanceRouter.use(bodyParser.urlencoded({ extended: true }));
attendanceRouter.use(bodyParser.json())

attendanceRouter.get('/', AttendanceController.getAllAttendance);
attendanceRouter.get('/:id', AttendanceController.getAnEmployeeAttendance);



export default attendanceRouter;