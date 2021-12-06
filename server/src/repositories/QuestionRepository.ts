import Question from '../models/Question';
import Answer from '../models/Answer';
import AnswerRepository from '../repositories/AnswerRepository';
import knex from '../database/connection';

class QuestionRepository {
    tableName = "question";
    secondTableName = "answer";

    async createQuestion(question: Question): Promise<number> {
       try{
            const id = await knex(this.tableName).insert(question).returning<number>('id');
            return id;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getQuestions(): Promise<Question[]> {
        try{
            const answerRepository = new AnswerRepository();
            
            const questions: Question[] = await knex.select('*').from(this.tableName).orderBy('createDate', 'desc');

            let questionsAnswered: Question[] = new Array();

            for(let question of questions) {
                if(question !== undefined && question.id !== undefined) {
                    const answers: Answer[] = await answerRepository.getAnswersByQuestionId(question.id);
                    
                    const questionAnswered: Question = {
                        id: question.id,
                        userId: question.userId,
                        title: question.title,
                        body: question.body,
                        createDate: new Date().toISOString(),
                        answers: answers
                    };
                    questionsAnswered.push(questionAnswered);
                }
            }
            
            return questionsAnswered;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getQuestionById(id: number): Promise<Question | undefined> {
        try{
            const answerRepository = new AnswerRepository();

            const question: Question | undefined = await knex.select('*').from(this.tableName).where('id', id).first();
            
            if(question !== undefined && question.id !== undefined) {
                const answers: Answer[] = await answerRepository.getAnswersByQuestionId(question.id);
                
                const questionAnswered: Question = {
                    id: question.id,
                    userId: question.userId,
                    title: question.title,
                    body: question.body,
                    createDate: new Date().toISOString(),
                    answers: answers
                };

                return questionAnswered;
            }

            return question;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getQuestionsByUserId(userId: number): Promise<Question[]> {
        try{
            const answerRepository = new AnswerRepository();

            const questions: Question[] = await knex.select('*').from(this.tableName).where('userId', userId);

            let questionsAnswered: Question[] = new Array();

            for(let question of questions) {
                if(question !== undefined && question.id !== undefined) {
                    const answers: Answer[] = await answerRepository.getAnswersByQuestionId(question.id);
                    
                    const questionAnswered: Question = {
                        id: question.id,
                        userId: question.userId,
                        title: question.title,
                        body: question.body,
                        createDate: new Date().toISOString(),
                        answers: answers
                    };
                    questionsAnswered.push(questionAnswered);
                }
            }

            return questionsAnswered;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async searchQuestions(search: string): Promise<Question[]> {
        try{
            const answerRepository = new AnswerRepository();
            
            const questions: Question[] = await knex.select('*')
                .from(this.tableName)
                .where('title', 'like', `%${search}%`)
                .orWhere('body', 'like', `%${search}%`)
                .orderBy('createDate', 'desc');

            let questionsAnswered: Question[] = new Array();

            for(let question of questions) {
                if(question !== undefined && question.id !== undefined) {
                    const answers: Answer[] = await answerRepository.getAnswersByQuestionId(question.id);
                    
                    const questionAnswered: Question = {
                        id: question.id,
                        userId: question.userId,
                        title: question.title,
                        body: question.body,
                        createDate: new Date().toISOString(),
                        answers: answers
                    };
                    questionsAnswered.push(questionAnswered);
                }
            }
            
            return questionsAnswered;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
export default QuestionRepository;