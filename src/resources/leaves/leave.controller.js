import Leave from "./leave.model";
import Employee from "../employee/employee.model";
import { 
  createError,
  getOrigIdFromGenerated 
} from '../../util';

export default class LeaveController {
  static requestForLeave(req, res, next) {
    const factoryObj = {
      by: req.user.id,
      reason: req.body.reason,
      from: req.body.from,
      duration: req.body.duration
    };

    Leave.create(factoryObj)
      .then(sendResponse)
      .catch(next);
    
    function sendResponse(leave) {
      res.status(201).json({
        status: 201,
        message: 'Leave sent',
        data: [leave.toJSON()]
      });
    }
  }

  static getLeave(req, res, next) {
    Leave.findOne({ id: req.params.leaveId })
      .populate('by')
      .exec()
      .then(sendResponse)
      .catch(next);

    function sendResponse(leave) {
      res.status(200).json({
        status: 200,
        data: [leave.toJSON()]
      });
    }
  }

  static getAllLeaves(req, res, next) {
    Leave.find({})
      .populate('by')
      .exec()
      .then(sendResponse)
      .catch(next);

    function sendResponse(docs) {
      res.status(200).json({
        status: 200,
        data: docs.map(leave => leave.toJSON())
      });
    }
  }
  
  static acceptLeave(req, res, next) {
    getOrigIdFromGenerated(req.params.leaveId, Leave)
      .then(verifyLeaveExists)
      .then(activateLeave)
      .then(sendResponse)
      .catch(next);

    function verifyLeaveExists(id) {
      if (!id)
        throw createError(404, 'Leave document not found');
      return id;
    }

    function activateLeave(id) { 
      return Leave.updateOne({ id }, { status: 'accepted' });
    }

    function sendResponse() {
      res.status(200).json({
        status: 200,
        message: 'Leave has been accepted'
      });
    }
  }

  static declineLeave(req, res, next) {
    getOrigIdFromGenerated(req.params.leaveId, Leave)
      .then(verifyLeaveExists)
      .then(nullifyLeave)
      .then(sendResponse)
      .catch(next);

    function verifyLeaveExists(id) {
      if (!id)
        throw createError(404, 'Leave document not found');
      return id;
    }

    function nullifyLeave(id) { 
      return Leave.updateOne({ id }, { status: 'declined' });
    }

    function sendResponse() {
      res.status(200).json({
        status: 200,
        message: 'Leave has been declined'
      });
    }
  }
}