import { Router } from 'express';

/** Controllers FRONT WEB */
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import WebHelpOrdersController from './app/controllers/WebHelpOrdersController';

/** Controllers FRONT MOBILE */
import MobileSessionController from './app/controllers/MobileSessionController';
import MobileHelpOrdersController from './app/controllers/MobileHelpOrdersController';
import MobileCheckInsController from './app/controllers/MobileCheckInsController';

import authMiddleware from './app/middlewares/auth';
import mobileAuthMiddleware from './app/middlewares/mobileAuth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/mobile-sessions', MobileSessionController.store);

/**
 * Rotas FRONT WEB
 */

routes.get('/students', authMiddleware, StudentController.index);
routes.post('/students', authMiddleware, StudentController.store);

routes.get('/plans', authMiddleware, PlanController.index);
routes.post('/plans', authMiddleware, PlanController.store);
routes.put('/plans/:plan_id', authMiddleware, PlanController.update);
routes.delete('/plans/:plan_id', authMiddleware, PlanController.delete);

routes.get('/registrations', authMiddleware, RegistrationController.index);
routes.post('/registrations', authMiddleware, RegistrationController.store);
routes.put(
  '/registrations/:reg_id',
  authMiddleware,
  RegistrationController.update
);
routes.delete(
  '/registrations/:reg_id',
  authMiddleware,
  RegistrationController.delete
);

routes.get('/help-orders', authMiddleware, WebHelpOrdersController.index);
routes.put(
  '/help-orders/:question_id/answer',
  authMiddleware,
  WebHelpOrdersController.update
);

/**
 * Rotas FRONT MOBILE
 */
routes.get(
  '/students/:student_id/checkins',
  mobileAuthMiddleware,
  MobileCheckInsController.index
);

routes.post(
  '/students/:student_id/checkins',
  mobileAuthMiddleware,
  MobileCheckInsController.store
);

routes.get(
  '/students/:student_id/help-orders',
  mobileAuthMiddleware,
  MobileHelpOrdersController.index
);

routes.get(
  '/students/:student_id/help-orders/:question_id',
  mobileAuthMiddleware,
  MobileHelpOrdersController.show
);

routes.post(
  '/students/:student_id/help-orders',
  mobileAuthMiddleware,
  MobileHelpOrdersController.store
);

export default routes;
