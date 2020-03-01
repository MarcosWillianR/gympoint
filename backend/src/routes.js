import { Router } from 'express';

/** Controllers FRONT WEB */
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import WebHelpOrdersController from './app/controllers/WebHelpOrdersController';

// User (admin) Controller
import UserController from './app/controllers/UserController';

/** Controllers FRONT MOBILE */
import MobileSessionController from './app/controllers/MobileSessionController';
import MobileHelpOrdersController from './app/controllers/MobileHelpOrdersController';
import MobileCheckInsController from './app/controllers/MobileCheckInsController';

import authMiddleware from './app/middlewares/auth';
import mobileAuthMiddleware from './app/middlewares/mobileAuth';

// Validators FRONT WEB
import validateSessionStore from './app/validators/SessionStore';

import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';

import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';

import validateUserTestStore from './app/validators/UserStoreTest';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.post('/mobile-sessions', MobileSessionController.store);

/**
 * Rotas FRONT WEB
 */

routes.post('/test/admin-create', validateUserTestStore, UserController.store); // only for tests

routes.get('/students', authMiddleware, StudentController.index);
routes.get('/students/:student_id', authMiddleware, StudentController.show);
routes.post(
  '/students',
  authMiddleware,
  validateStudentStore,
  StudentController.store
);
routes.put(
  '/students/:student_id',
  authMiddleware,
  validateStudentUpdate,
  StudentController.update
);
routes.delete(
  '/students/:student_id',
  authMiddleware,
  StudentController.delete
);

routes.get('/plans', authMiddleware, PlanController.index);
routes.get('/plans/:plan_id', authMiddleware, PlanController.show);
routes.post('/plans', authMiddleware, validatePlanStore, PlanController.store);
routes.put(
  '/plans/:plan_id',
  authMiddleware,
  validatePlanUpdate,
  PlanController.update
);
routes.delete('/plans/:plan_id', authMiddleware, PlanController.delete);

routes.get('/registrations', authMiddleware, RegistrationController.index);
routes.get(
  '/registrations/:reg_id',
  authMiddleware,
  RegistrationController.show
);
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
