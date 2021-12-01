import User from '../models/User';
import knex from '../database/connection';

class UserRepository {
    tableName = "user";

    async createUser(user: User): Promise<number> {
       try{
            const id = await knex(this.tableName).insert(user).returning<number>('id');
            return id;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getUsers(): Promise<User[]> {
        try{
            const users: User[] = await knex.select('*').from(this.tableName);
            return users;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getUserById(id: number): Promise<User | undefined>{
        try{
            const user: User | undefined = await knex.select('*').from<User>(this.tableName).where('id', id).first();
            return user;  
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
export default UserRepository;