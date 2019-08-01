import { Router } from 'express';
import adminRouter from './resources/admin/admin.router';
import employeeRouter from './resources/employee/employee.router'
import attendanceRouter from './resources/attendance/attendance.route';
import employeeLeaveRouter from './resources/leave/leave.employee.route'
import adminLeaveRouter from './resources/leave/leave.admin.router'

export function setup() {
  const apiRouter = Router();

  // add api routes here
  apiRouter.use('/admin/leave/',adminLeaveRouter)
  apiRouter.use('/employee/leave',employeeLeaveRouter)
  apiRouter.use('/employee/attendance', attendanceRouter)
  apiRouter.use('/employee', employeeRouter)
  apiRouter.use('/admin', adminRouter);

  return apiRouter;
}