import Task from './task.model';
import Employee from '../employees/employee.model';
import {
  createError,
  getOrigIdFromGenerated
} from '../../util';

export default class TaskController {
  static createTask(req, res, next) {
    getOrigIdFromGenerated(req.body.receiver, Employee)
      .then(createNewTask)
      .then(sendResponse)
      .catch(next);

    function createNewTask(_id) {
      const factoryObj = {
        issuer: req.user.id,
        title: req.body.title,
        description: req.body.description,
        receiver: _id,
        eta: req.body.eta
      };
      return Task.create(factoryObj);
    }

    function sendResponse(task) {
      res.status(201).json({
        status: 201,
        message: 'Task created',
        data: [task.toJSON()]
      });
    }
  }

  static getTask(req, res, next) {
    getTask()
      .then(checkIfTaskExists)
      .then(checkIfIssuerOrRecepientIsClient)
      .then(sendResponse)
      .catch(next);

    function getTask() {
      return Task.findOne({ id: req.params.taskId })
        .populate('issuer receiver')
        .exec();
    }

    function checkIfTaskExists(task) {
      if (!task)
        throw createError(404, 'Task does not exist');
      return task;
    }

    function checkIfIssuerOrRecepientIsClient(task) {
      if (task.issuer._id.toHexString() != req.user.id && 
        task.receiver._id.toHexString() != req.user.id)
        throw createError(403, 'Only the issuer or receiver can view this task');
      return task;
    }

    function sendResponse(task) {
      res.status(200).json({
        status: 200,
        data: [task.toJSON()]
      });
    }
  }

  static getAllTasks(req, res, next) {
    Task.find({})
      .populate('issuer receiver')
      .exec()
      .then(sendResponse)
      .catch(next);

    function sendResponse(docs) {
      const id = req.user.id;
      res.status(200).json({
        status: 200,
        data: docs.filter(userCanView).map(task => task.toJSON())
      });

      function userCanView(task) {
        return task.issuer._id.equals(id) || task.receiver._id.equals(id);
      }
    }
  }

  static completeTask(req, res, next) {
    const query = { id: req.params.taskId, receiver: req.user.id };

    Task.updateOne(query, { complete: true, closed: false })
      .then(sendResponse)
      .catch(next);

    function sendResponse() {
      res.status(200).json({
        status: 200,
        message: 'Task tagged as completed'
      });
    }
  }

  static openTask(req, res, next) {
    const query = { id: req.params.taskId, issuer: req.user.id };

    Task.updateOne(query, { complete: false, closed: false })
      .then(sendResponse)
      .catch(next);

    function sendResponse() {
      res.status(200).json({
        status: 200,
        message: 'Task reopened'
      });
    }
  }

  static closeTask(req, res, next) {
    const query = { id: req.params.taskId, issuer: req.user.id };

    Task.updateOne(query, { closed: true })
      .then(sendResponse)
      .catch(next);

    function sendResponse() {
      res.status(200).json({
        status: 200,
        message: 'Task closed'
      });
    }
  }
}