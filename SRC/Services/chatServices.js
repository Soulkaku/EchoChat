
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
        const messages = await messageModel.find({ origin: room });
        return messages.map(item => ({
            text: item.text,
            user: item.user,
            origin: item.origin
        }));
    }
}

export default new chatService;