import Role from './role.model';
import { createError } from '../../util';

/**
 * This is the layer between the controller and the database.
 */
export default class RoleService {
  /**
   * Creates a new role.
   * @param  {String} options.name    The role name itself.
   * @param  {Array} options.actions  The list of actions possible for the role.
   * @return {[type]}                 [description]
   */
  static createRole({ name, actions }) {
    actions = actions || [];
    name = name.toLowerCase();

    return getExistingRole()
      .then(abortIfRoleExists)
      .then(createNewRole);

    function getExistingRole() {
      return Role.findOne({ name });
    }

    function abortIfRoleExists(role) {
      if (role)
        throw createError(422, 'Role already exists');
    }

    function createNewRole() {
      return Role.create({ name, actions });
    }
  }

  static getRoles() {
    return Roles.find({})
      .then(roles => roles.map(role => role.toJSON()));
  }

  static getRole(query) {
    return Role.findOne(query)
      .then(role => role ? role.toJSON() : null);
  }

  static updateRole({ query, update }) {
    return Role.updateOne(query, update);
  }

  static deleteRole(query) {
    return Role.deleteOne(query);
  }
}