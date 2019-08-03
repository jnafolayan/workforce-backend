import { Router } from 'express';
import StatsController from './stats.controller';
import verifyAuth from '../../middlewares/verifyAuth';
import verifyAdmin from '../../middlewares/verifyAdmin';

const statsRouter = Router();

// TODO: only an admin can access this route
statsRouter.get('/', verifyAuth, StatsController.getForAllEmployees);
statsRouter.get('/:employeeId', verifyAuth, StatsController.getForEmployee);

export default statsRouter;