import RoleService from "./role.service";
import { 
  createError,
  getOrigIdFromGenerated 
} from '../../util';

export default class RoleController {
  static createRole(req, res, next) {
    RoleService.createRole(req.body)
      .then(() => res.status(201).json({
        status: 201,
        message: 'Role created'
      }))
      .catch(next);
  }

  static getAllRoles(req, res, next) {
    RoleService.getRoles()
      .then(roles => res.status(200).json({
        status: 200,
        data: roles
      }))
      .catch(next);
  }

  static getRole(req, res, next) {
    RoleService.getRole({ id: req.params.roleId })
      .then(role => res.status(200).json({
        status: 200,
        data: [role]
      }))
      .catch(next);
  }

  static updateRole(req, res, next) {
    const dto = {
      query: { 
        id: req.params.roleId 
      },
      update: {
        ...req.body
      }
    };

    RoleService.updateRole(dto)
      .then(() => res.status(200).json({
        status: 200,
        message: 'Role update successful'
      }))
      .catch(next);
  }

  static deleteRole(req, res, next) {
    RoleService.deleteRole({ id: req.params.roleId })
      .then(() => res.status(200).json({
        status: 200,
        message: 'Role deleted'
      }))
      .catch(next);
  }
}