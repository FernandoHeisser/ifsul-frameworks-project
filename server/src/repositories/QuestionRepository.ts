import Question from '../models/Question';
import knex from '../database/connection';

class QuestionRepository {
    tableName = "question";

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
            const questions: Question[] = await knex.select('*').from(this.tableName).orderBy('createDate');
            return questions;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getQuestionById(id: number): Promise<Question | undefined> {
        try{
            const question: Question | undefined = await knex.select('*').from(this.tableName).where('id', id).first();
            return question;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getQuestionsByUserId(userId: number): Promise<Question[]> {
        try{
            const questions: Question[] = await knex.select('*').from(this.tableName).where('userId', userId);
            return questions;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
export default QuestionRepository;