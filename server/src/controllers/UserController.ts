import { Request, Response } from 'express'
import User from '../models/User';
import UserRepository from '../repositories/UserRepository'

class UserController {

    async createUser(request: Request, response: Response) {
        const userRepository = new UserRepository();

        const users: User[] | undefined = await userRepository.getUsers();

        if(users != undefined){
            var found = users.find(user => (user.email == request.body.email) || (user.nickname == request.body.nickname));
        }
        
        if(found === undefined || found === null) {

            try {
                const userId = await userRepository.createUser(request.body);
                return response.json(userId);
            } catch(e) {
                response.status(400);
                return response.json({status:"Bad request", message:e});
            }

        } else {

            response.status(400);
            return response.json({status:"Bad request", message:"Email or nickname already exists"});

        }
    }
    
    async getUsers(request: Request, response: Response) {
        const userRepository = new UserRepository();
        
        const users: User[] | undefined = await userRepository.getUsers();

        if(users === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(users);
    }

    async getUserById(request: Request, response: Response) {
        const userRepository = new UserRepository();

        const id = parseInt(request.params.id);

        if(isNaN(id) || !isFinite(id)){
            response.status(400);
            return response.json({status:"Bad request"});
        }

        const user: User | undefined = await userRepository.getUserById(id);
        
        if(user === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(user);
    }

    async getUserNicknameById(request: Request, response: Response) {
        const userRepository = new UserRepository();

        const id = parseInt(request.params.id);

        if(isNaN(id) || !isFinite(id)){
            response.status(400);
            return response.json({status:"Bad request"});
        }

        const user: User | undefined = await userRepository.getUserById(id);
        
        if(user === undefined){
            response.status(404);
            return response.json({status:"Not found"});
        }
        return response.json(user.nickname);
    }

    badRequest(request: Request, response: Response) {
        response.status(400);
        return response.json({status:"Bad request"});
    }
}
export default UserController;