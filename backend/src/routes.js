import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import MobileSessionController from './app/controllers/MobileSessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/mobile-sessions', MobileSessionController.store);

/**
 * Rotas FRONT WEB
 */
routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:plan_id', PlanController.update);
routes.delete('/plans/:plan_id', PlanController.delete);

routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:reg_id', RegistrationController.update);
routes.delete('/registrations/:reg_id', RegistrationController.delete);

/**
 * Rotas FRONT MOBILE
 */

export default routes;
