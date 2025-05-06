
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
        const messages = await messageModel.find();
        return messages;
    }

    async postMessages(text, room, user) {
        const message = await messageModel.create({text : text }, {room: room } );
        const populated = await message.findById(message._id).populate('user');
    }
}

export default new chatService;