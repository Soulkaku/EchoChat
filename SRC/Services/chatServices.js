
import messageModel from "../Models/messageModel.js";
import userModel from "../Models/userModel.js";

class chatService {
    async createUser(user) {
        const findUser = await userModel.findOne({ name : user.name});

        if(findUser) {
            throw new Error(" name already exist ");
        } else {
            return await userModel.create({name : user.name});
        }
    }


    async showMessages(room) {
        const messages = await messageModel.find({ origin: room }).select('text origin');
        
        return messages.map(message => ({
                text: message.text,
                // user: message.user,
                origin: message.origin
            }));
    }
}

export default new chatService;