import { Router } from 'express';
import RoleController from './role.controller';
import verifyAuth from '../../middlewares/verifyAuth';
import verifyAdmin from '../../middlewares/verifyAdmin';

const roleRouter = Router();

roleRouter.post('/', verifyAuth, verifyAdmin, RoleController.createRole);
roleRouter.get('/', verifyAuth, verifyAdmin, RoleController.getAllRoles);

roleRouter.get('/:roleId', verifyAuth, verifyAdmin, RoleController.getRole);

roleRouter.patch('/:roleId', verifyAuth, verifyAdmin, RoleController.updateRole);
roleRouter.delete('/:roleId', verifyAuth, verifyAdmin, RoleController.deleteRole); 

export default roleRouter;