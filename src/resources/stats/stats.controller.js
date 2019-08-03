import moment from 'moment';
import Employee from '../employees/employee.model';
import Attendance from '../attendance/attendance.model';
import Leave from '../leaves/leave.model';
import Task from '../tasks/task.model';

import {
  createError,
  generateHash,
  generateJwtToken,
  getOrigIdFromGenerated
} from '../../util';

export default class StatsController {
  static getForEmployee(req, res, next) {
    getOrigIdFromGenerated(req.params.employeeId, Employee)
      .then(_id => ({
        employee: _id,
        stats: {}
      }))
      .then(getAttendanceStats)
      .then(getLeaveStats)
      .then(getTaskStats)
      .then(sendResponse)
      .catch(next);
  }
}

function getAttendanceStats({ employee, stats }) {
  return Promise.all([
    Employee.findOne({ _id: employee),
    Attendance.find({ employee })
  }).then(([employee, docs]) => {
    const startDate = employee.createdAt;
    const today = moment();

    stats.attendance = {
      daysElapsed: moment().subtract(new Date(start).toISOString()),
      count: docs.length,
      days: getDays(docs, startDate)
    };

    return {
      employee,
      stats
    }
  });

  function getDays(docs, startDate) {

    return docs.map(doc => {
      return {
        date: moment(doc.entry, 'DD-MM-YY'),
        entry: doc.entry,
        exit: doc.exit,
        exited: !!doc.exit
      }
    });
  }
}

function getLeaveStats({ employee, stats }) {
  return Leave.find({ by: employee })
    .then(leaves => {
      stats.leaves = {
        count: leaves.count,
        accepted: leaves.filter(leave => leave.accepted).length,
        declined: leaves.filter(leave => leave.declined).length
      };
      return { employee, stats };
    });
}

function getTaskStats({ employee, stats }) {
  return Task.find({ receiver: employee })
    .then(tasks => {
      stats.tasks = {
        count: tasks.count,
        completed: tasks.filter(task => task.status == 'completed').length,
        pending: tasks.filter(task => task.status == 'pending').length,
        closed: tasks.filter(task => task.status == 'closed').length
      };
      return { employee, stats };
    });
}