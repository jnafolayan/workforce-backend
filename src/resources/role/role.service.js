import Role from './role.model';

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
  static createRole({ name }) {
    name = name.toLowerCase();

    return Role.create({ name: name.toLowerCase() })
      .then();

    function getExistingRole() {
      return Role.findOne({ name });
    }

    function abortIfRoleExists(role) {
      if (role)
        throw createError(403, 'Role already exists');
    }

    function createNewRole() {
      return Role.cr
    }
  }
}