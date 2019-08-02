import { Router } from 'express';
import RoleController from './role.controller';


const roleRouter = Router();

roleRouter.post('/', RoleController.createRole);
roleRouter.get('/', RoleController.getAllRoles);

roleRouter.get('/:roleId', RoleController.getRole);

roleRouter.patch('/:roleId', RoleController.updateRole);
roleRouter.delete('/:roleId', RoleController.deleteRole); 

export default roleRouter;