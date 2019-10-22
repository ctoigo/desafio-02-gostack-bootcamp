import Router from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.create);
routes.post('/sessions', SessionController.create);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/students', StudentsController.create);
routes.get('/students', StudentsController.search);
routes.put('/students', StudentsController.update);
routes.delete('/students', StudentsController.delete);

export default routes;