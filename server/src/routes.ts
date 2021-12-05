import express from 'express'

import UserController from './controllers/UserController'
import QuestionController from './controllers/QuestionController'
import AnswerController from './controllers/AnswerController'

const routes = express.Router();

const userController = new UserController();
const questionController = new QuestionController();
const answerController = new AnswerController();

routes.post('/api/user', userController.createUser);
routes.get('/api/users', userController.getUsers);
routes.get('/api/user/:id', userController.getUserById);
routes.get('/api/user/nickname/:id', userController.getUserNicknameById);

routes.post('/api/question', questionController.createQuestion);
routes.get('/api/questions', questionController.getQuestions);
routes.get('/api/question/:id', questionController.getQuestionById);
routes.get('/api/questions/user/:id', questionController.getQuestionsByUserId);

routes.get('/api/question-list', questionController.getQuestionList);

routes.post('/api/answer', answerController.createAnswer);
routes.get('/api/answers', answerController.getAnswers);
routes.get('/api/answer/:id', answerController.getAnswerById);
routes.get('/api/answers/user/:id', answerController.getAnswersByUserId);
routes.get('/api/answers/question/:id', answerController.getAnswersByQuestionId);

routes.get('/api/answer-list', answerController.getAnswerList);

routes.get('*', userController.badRequest);
routes.post('*', userController.badRequest);
routes.put('*', userController.badRequest);
routes.delete('*', userController.badRequest);

export default routes;