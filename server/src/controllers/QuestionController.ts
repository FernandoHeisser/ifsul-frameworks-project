import { Request, Response } from 'express'
import Question from '../models/Question';
import QuestionDTO from '../models/QuestionDTO';
import AnswerDTO from '../models/AnswerDTO';
import QuestionRepository from '../repositories/QuestionRepository'
import UserRepository from '../repositories/UserRepository'

class QuestionController {

    async createQuestion(request: Request, response: Response) {
        const questionRepository = new QuestionRepository();
        const userRepository = new UserRepository();
        try {
            const userId = request.body.userId;

            if(userId !== undefined) {
                const user = await userRepository.getUserById(userId);

                if(user === undefined) {
                    response.status(400);
                    return response.json({status:"Bad request", message:"User not found"});
                }
            }

            const question: Question = new Question(
                request.body.userId,
                request.body.title,
                request.body.body
            );

            const questionId = await questionRepository.createQuestion(question);
            return response.json(questionId);
        } catch(e) {
            response.status(400);
            return response.json({status:"Bad request", message:e});
        }
    }
    
    async getQuestions(request: Request, response: Response) {
        const questionRepository = new QuestionRepository();
        
        const questions: Question[] | undefined = await questionRepository.getQuestions();

        if(questions === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(questions);
    }

    async getQuestionById(request: Request, response: Response) {
        const questionRepository = new QuestionRepository();

        const id = parseInt(request.params.id);

        if(isNaN(id) || !isFinite(id)){
            response.status(400);
            return response.json({status:"Bad request"});
        }

        const question: Question | undefined = await questionRepository.getQuestionById(id);
        
        if(question === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(question);
    }

    async getQuestionsByUserId(request: Request, response: Response) {
        const questionRepository = new QuestionRepository();

        const id = parseInt(request.params.id);

        if(isNaN(id) || !isFinite(id)){
            response.status(400);
            return response.json({status:"Bad request"});
        }
        
        const questions: Question[] | undefined = await questionRepository.getQuestionsByUserId(id);

        if(questions === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(questions);
    }

    async getQuestionList(request: Request, response: Response) {
        const questionRepository = new QuestionRepository();
        const userRepository = new UserRepository();

        const questions: Question[] | undefined = await questionRepository.getQuestions();

        var questionDTOs: QuestionDTO[] = [];

        for(let question of questions) {
            if(question.id !== undefined ) {
                
                const user = await userRepository.getUserById(question.userId);

                let answerDTOs: AnswerDTO[] = [];
                
                if(question.answers != undefined) {

                    for(let answer of question.answers) {

                        const user = await userRepository.getUserById(answer.userId);

                        if(answer.id !== undefined && user !== undefined) {
                            answerDTOs.push({
                                id: answer.id,
                                questionId: answer.questionId,
                                userId: answer.userId,
                                nickname: user.nickname,
                                body: answer.body,
                                createDate: answer.createDate
                            });
                        }
                    };
                }

                if(user != undefined) {
                    questionDTOs.push({
                        id: question.id,
                        userId: question.userId,
                        nickname: user.nickname,
                        title: question.title,
                        body: question.body,
                        createDate: question.createDate,
                        answers: answerDTOs,
                        answersCount: question.answers != undefined ? question.answers.length : 0
                    });
    
                }
            }
        }
        
        if(questionDTOs === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(questionDTOs);
    }

    async searchQuestions(request: Request, response: Response) {
        const questionRepository = new QuestionRepository();
        const userRepository = new UserRepository();

        const questions: Question[] | undefined = await questionRepository.searchQuestions(request.params.search);

        var questionDTOs: QuestionDTO[] = [];

        for(let question of questions) {
            if(question.id !== undefined ) {
                
                const user = await userRepository.getUserById(question.userId);

                let answerDTOs: AnswerDTO[] = [];
                
                if(question.answers != undefined) {

                    for(let answer of question.answers) {

                        const user = await userRepository.getUserById(answer.userId);

                        if(answer.id !== undefined && user !== undefined) {
                            answerDTOs.push({
                                id: answer.id,
                                questionId: answer.questionId,
                                userId: answer.userId,
                                nickname: user.nickname,
                                body: answer.body,
                                createDate: answer.createDate
                            });
                        }
                    };
                }

                if(user != undefined) {
                    questionDTOs.push({
                        id: question.id,
                        userId: question.userId,
                        nickname: user.nickname,
                        title: question.title,
                        body: question.body,
                        createDate: question.createDate,
                        answers: answerDTOs,
                        answersCount: question.answers != undefined ? question.answers.length : 0
                    });
    
                }
            }
        }
        
        if(questionDTOs === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(questionDTOs);
    }
}
export default QuestionController;