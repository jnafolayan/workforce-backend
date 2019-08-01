import Attendance from './attendance.models'
import Employee from '../employee/employee.model'
import { createError, checkIfDatesAreToday } from '../../util';

export default class AttendanceController {
  static signin(req, res, next) {
    const userId = req.user.id;

    return makeEntry()
      .then(sendResponse)
      .catch(next);

    function makeEntry() {
      return Attendance.create({ employee: userId });
    }
    
    function sendResponse(attendance) {
      res.status(201).json({
        status: 201,
        message: 'Employee has signed in'
      });
    }
  }

  static signout(req, res, next) {
    function getLastEntry()
      .then(checkIfMadeToday)
      .then(signEmployeeOut)
      .then(sendResponse)
      .catch(next);

    function getLastEntry() {
      return Attendance.findOne({}).sort({
        createdAt: -1
      });
    }

    function checkIfMadeToday(attendance) {
      if (!attendance)
        return false;

      const isToday = checkIfDatesAreToday(new Date, attendance.entry);
      if (!isToday)
        throw createError(403, 'Employee hasn\'t signed in');

      return attendance;
    }

    function signEmployeeOut(attendance) {
      return Attendance.updateOne({ _id: attendance._id }, {
        exit: new Date()
      });
    }

    function sendResponse(isToday) {
      res.status(200).json({
        status: 200,
        message: 'Employee has signed out',
      });
    }
  }

  static getTodaysAttendance(req, res, next) {
    return getLastEntry()
      .then(checkIfMadeToday)
      .then(sendResponse)
      .catch(next);

    function getLastEntry() {
      return Attendance.findOne({}).sort({
        createdAt: -1
      });
    }

    function checkIfMadeToday(attendance) {
      if (!attendance) 
        return false;

      const isToday = checkIfDatesAreToday(new Date, attendance.entry);
      return isToday ? attendance : null;
    }

    function sendResponse(attendance) {
      res.status(200).json({
        status: 200,
        data: [attendance.toJSON()]
      });
    }
  }

  static getAllEmployeesAttendance(req, res, next) {
    return Attendance.find({})
      .populate('employee')
      .exec()
      .then(sendResponse)
      .catch(next);

    function sendResponse(docs) {
      res.status(200).json({
        status: 200,
        data: docs.map(attendance => {
          employee: attendance.employee.toJSON(),
          entry: attendance.entry,
          exit: attendance.exit ? attendance.exit || false
        });
      });
    }
  }

  static getEmployeeAttendance(req, res, next) {
    return Attendance.find({ employee: req.user.id })
      .populate('employee')
      .exec()
      .then(sendResponse)
      .catch(next);

    function sendResponse(docs) {
      res.status(200).json({
        status: 200,
        data: docs.map(attendance => {
          employee: attendance.employee.toJSON(),
          entry: attendance.entry,
          exit: attendance.exit ? attendance.exit || false
        });
      });
    }
  }
}
