import express from 'express'

import UserController from './controllers/UserController'

const routes = express.Router();

const userController = new UserController();

routes.post('/api/user', userController.createUser);
routes.get('/api/users', userController.getUsers);
routes.get('/api/user/:id', userController.getUserById);

routes.get('*', userController.badRequest);
routes.post('*', userController.badRequest);
routes.put('*', userController.badRequest);
routes.delete('*', userController.badRequest);

export default routes;