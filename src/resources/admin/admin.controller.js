import bcrypt from 'bcrypt';
import Admin from './admin.model';
import { 
  createError, 
  generateJwtToken,
  generateHash 
} from '../../util';

export default class AdminController {
  static registerAdmin(req, res, next) {
    createNewAdmin()
      .then(genPasswordHash)
      .then(attachPasswordHash)
      .then(sendResponse)
      .catch(next);

    function createNewAdmin() {
      return new Admin({
        username: req.body.username
      });
    }

    function genPasswordHash(admin) {
      return Promise.all([
        Promise.resolve(admin),
        bcrypt.hash(req.body.password, 11)
      ]);
    }

    function attachPasswordHash([admin, hash]) {
      admin.password = hash;
      return admin.save();
    }

    function sendResponse(admin) {
      res.status(201).json({
        status: 201,
        message: 'Admin account created'
      });
    } 
  }

  static loginAdmin(req, res, next) {
    getAdmin()
      .then(checkIfAdminExists)
      .then(comparePassword)
      .then(abortIfPasswordMismatch)
      .then(generateAdminToken)
      .then(sendResponse)
      .catch(next);

    function getAdmin() {
      return Admin.findOne({
        username: req.body.username
      });
    }

    function checkIfAdminExists(admin) {
      if (!admin) 
        throw createError(404, 'Account was not found');
      return admin;
    }

    function comparePassword(admin) {
      return Promise.all([
        Promise.resolve(admin),
        bcrypt.compare(req.body.password, admin.password)
      ]);
    }

    function abortIfPasswordMismatch([admin, status]) {
      if (status)
        throw createError(403, 'The password doesn\'t match');
      return admin;
    }

    function generateAdminToken(admin) {
      return generateJwtToken({
        id: admin._id
      }, '7d');
    }

    function sendResponse(token) {
      res.status(200).json({
        status: 200,
        message: 'Admin logged in',
        data: { token }
      });
    }
  }
}
