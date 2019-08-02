import bcrypt from 'bcrypt';
import Employee from "./employee.model";
import Attendance from "../attendance/attendance.model"
import Leave from "../leaves/leave.model"
import Task from "../tasks/task.model"

import {
  createError,
  generateHash,
  generateJwtToken,
  getOrigIdFromGenerated
} from '../../util';

export default class EmployeeController {
  static signup(req, res ,next) {
    getExisting()
      .then(abortIfEmployeeExists)
      .then(createNewEmployee)
      .then(genPasswordHash)
      .then(attachPasswordHash)
      .then(sendResponse)
      .catch(next);

    function getExisting() {
      return Employee.findOne({ email: req.body.email });
    }

    function abortIfEmployeeExists(emp) {
      if (emp)
        throw createError(422, 'An employee already exists');
    }

    function createNewEmployee() {
      const obj = { ...req.body };
      delete obj.password;

      return new Employee(obj); 
    }

    function genPasswordHash(employee) {
      return Promise.all([
        Promise.resolve(employee),
        generateHash(req.body.password)
      ]);
    }

    function attachPasswordHash([employee, hash]) {
      employee.password = hash;
      return employee.save();
    }

    function sendResponse(employee) {
      res.status(201).json({
        status: 201,
        message: 'Employee account created'
      });
    } 
  }

  static login(req, res, next) {
    getEmployee()
      .then(checkIfEmployeeExists)
      .then(comparePassword)
      .then(abortIfPasswordMismatch)
      .then(generateEmployeeToken)
      .then(sendResponse)
      .catch(next);

    function getEmployee() {
      return Employee.findOne({
        email: req.body.email
      });
    }

    function checkIfEmployeeExists(employee) {
      if (!employee) 
        throw createError(404, 'Account was not found');
      return employee;
    }

    function comparePassword(employee) {
      return Promise.all([
        Promise.resolve(employee),
        bcrypt.compare(req.body.password, employee.password)
      ]);
    }

    function abortIfPasswordMismatch([employee, status]) {
      if (!status)
        throw createError(403, 'The password doesn\'t match');
      return employee;
    }

    function generateEmployeeToken(employee) {
      return [
        employee,
        generateJwtToken({
          id: employee._id
        }, '7d')
      ];
    }

    function sendResponse([employee, token]) {
      res.status(200).json({
        status: 200,
        message: 'Employee logged in',
        data: [{
          token,
          employeeId: employee.id 
        }]
      });
    }
  }

  static getEmployees(req, res, next) {
    Employee.find({})
      .then(sendResponse)
      .catch(next);

    function sendResponse(docs) {
      res.status(200).json({
        status: 200,
        data: docs.map(employee => employee.toJSON())
      });
    }
  }

  // route to remove a staff
  static removeEmployee(req, res, next) {
    getOrigIdFromGenerated(req.params.employeeId, Employee)
      .then(verifyEmployeeExists)
      .then(deleteAllAttendance)
      .then(deleteAllLeaves)
      .then(deleteEmployee)
      .then(sendResponse)
      .catch(next);

    function verifyEmployeeExists(id) {
      if (!id)
        throw createError(404, 'Employee account not found');
      return id;
    }

    function deleteAllAttendance(_id) {
      return Attendance.deleteMany({ employee: _id })
        .then(() => _id);
    }

    function deleteAllLeaves(_id) {
      return Leave.deleteMany({ by: _id  });
    }
    
    function deleteEmployee() {
      return Employee.deleteOne({ id: req.params.employeeId })
    }

    function sendResponse() {
      res.status(200).json({
        status: 200,
        message: 'Employee removed'
      });
    }
  }

  static getEmployee(req, res, next) {
    Employee.findOne({ id: req.params.employeeId })
      .then(sendResponse)
      .catch(next);

    function sendResponse(employee) {
      res.status(200).json({
        status: 200,
        data: [employee.toJSON()]
      });
    }
  }

  static getEmployeeLeaves(req, res, next) {
    getOrigIdFromGenerated(req.params.employeeId, Employee)
      .then(verifyEmployeeExists)
      .then(getAll)
      .then(sendResponse)
      .catch(next);

    function verifyEmployeeExists(id) {
      if (!id)
        throw createError(404, 'Employee account not found');
      return id;
    }

    function getAll(id) { 
      return Leave.find({ by: id })
        .populate('by')
        .exec();
    }

    function sendResponse(docs) {
      res.status(200).json({
        status: 200,
        data: docs.map(leave => leave.toJSON())
      });
    }
  }

  static getEmployeeTasks(req, res, next) {
    getOrigIdFromGenerated(req.params.employeeId, Employee)
      .then(verifyEmployeeExists)
      .then(getAll)
      .then(sendResponse)
      .catch(next);

    function verifyEmployeeExists(id) {
      if (!id)
        throw createError(404, 'Employee account not found');
      return id;
    }

    function getAll(id) { 
      return Task.find({ recepient: id })
        .populate('issuer recepient')
        .exec();
    }

    function sendResponse(docs) {
      res.status(200).json({
        status: 200,
        data: docs.map(task => task.toJSON())
      });
    }
  }
}