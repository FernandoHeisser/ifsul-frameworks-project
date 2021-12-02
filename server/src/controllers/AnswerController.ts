import { Request, Response } from 'express'
import Answer from '../models/Answer';
import AnswerRepository from '../repositories/AnswerRepository'
import QuestionRepository from '../repositories/QuestionRepository'
import UserRepository from '../repositories/UserRepository'

class AnswerController {

    async createAnswer(request: Request, response: Response) {
        const answerRepository = new AnswerRepository();
        const questionRepository = new QuestionRepository();
        const userRepository = new UserRepository();

        try {
            const userId = request.body.userId;
            const questionId = request.body.questionId;

            if(userId !== undefined) {
                const user = await userRepository.getUserById(userId);

                if(user === undefined) {
                    response.status(400);
                    return response.json({status:"Bad request", message:"User not found"});
                }
            }

            if(questionId !== undefined) {
                const question = await questionRepository.getQuestionById(questionId);

                if(question === undefined) {
                    response.status(400);
                    return response.json({status:"Bad request", message:"Question not found"});
                }
            }

            const answer: Answer = new Answer(
                request.body.questionId,
                request.body.userId,
                request.body.body
            );

            const answerId = await answerRepository.createAnswer(answer);
            return response.json(answerId);
        } catch(e) {
            response.status(400);
            return response.json({status:"Bad request", message:e});
        }
    }
    
    async getAnswers(request: Request, response: Response) {
        const answerRepository = new AnswerRepository();
        
        const answers: Answer[] | undefined = await answerRepository.getAnswers();

        if(answers === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(answers);
    }

    async getAnswerById(request: Request, response: Response) {
        const answerRepository = new AnswerRepository();

        const id = parseInt(request.params.id);

        if(isNaN(id) || !isFinite(id)){
            response.status(400);
            return response.json({status:"Bad request"});
        }

        const answer: Answer | undefined = await answerRepository.getAnswerById(id);
        
        if(answer === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(answer);
    }

    async getAnswersByUserId(request: Request, response: Response) {
        const answerRepository = new AnswerRepository();

        const id = parseInt(request.params.id);

        if(isNaN(id) || !isFinite(id)){
            response.status(400);
            return response.json({status:"Bad request"});
        }
        
        const answers: Answer[] | undefined = await answerRepository.getAnswersByUserId(id);

        if(answers === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(answers);
    }

    async getAnswersByQuestionId(request: Request, response: Response) {
        const answerRepository = new AnswerRepository();

        const id = parseInt(request.params.id);

        if(isNaN(id) || !isFinite(id)){
            response.status(400);
            return response.json({status:"Bad request"});
        }
        
        const answers: Answer[] | undefined = await answerRepository.getAnswersByQuestionId(id);

        if(answers === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(answers);
    }
}
export default AnswerController;