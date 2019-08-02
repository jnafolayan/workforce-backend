import { Router } from 'express';
import adminRouter from './resources/admin/admin.router';
import employeeRouter from './resources/employees/employee.router'
import attendanceRouter from './resources/attendance/attendance.router';
import leaveRouter from './resources/leaves/leave.router';
import taskRouter from './resources/tasks/task.router';
import roleRouter from './resources/roles/role.router';

export function setup() {
  const apiRouter = Router();

  // add api routes here
  apiRouter.use('/admin', adminRouter);
  apiRouter.use('/attendance', attendanceRouter);
  apiRouter.use('/leaves', leaveRouter);
  apiRouter.use('/employees', employeeRouter);
  apiRouter.use('/tasks', taskRouter);
  apiRouter.use('/roles', roleRouter);

  return apiRouter;
}