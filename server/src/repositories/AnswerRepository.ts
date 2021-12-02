import Answer from '../models/Answer';
import knex from '../database/connection';

class AnswerRepository {
    tableName = "answer";

    async createAnswer(answer: Answer): Promise<number> {
       try{
            const id = await knex(this.tableName).insert(answer).returning<number>('id');
            return id;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getAnswers(): Promise<Answer[]> {
        try{
            const answers: Answer[] = await knex.select('*').from(this.tableName).orderBy('createDate', 'desc');
            return answers;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getAnswerById(id: number): Promise<Answer | undefined> {
        try{
            const answer: Answer | undefined = await knex.select('*').from(this.tableName).where('id', id).first();
            return answer;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getAnswersByUserId(userId: number): Promise<Answer[]> {
        try{
            const answers: Answer[] = await knex.select('*').from(this.tableName).where('userId', userId);
            return answers;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getAnswersByQuestionId(questionId: number): Promise<Answer[]> {
        try{
            const answers: Answer[] = await knex.select('*').from(this.tableName).where('questionId', questionId);
            return answers;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
export default AnswerRepository;