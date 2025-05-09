import userModel from "../Models/userModel.js";

class loginService {

        async createUser(user) {
            const findUser = await userModel.findOne({ name : user.name});
    
            if(findUser) {
                return findUser;
                // throw new Error(" name already exist ");
            } else {
                return await userModel.create({name : user.name});
            }
        }
    
}

export default new loginService;