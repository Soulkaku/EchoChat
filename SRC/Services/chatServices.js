
import messageModel from "../Models/messageModel.js";
import userModel from "../Models/userModel.js";

class chatService {
    
    async createUser(user) {
        const findUser = await userModel.findOne({ name : user.name});

        if(findUser) {
            return findUser;
            // throw new Error(" name already exist ");
        } else {
            return await userModel.create({name : user.name});
        }
    }

    async createMessage(text, room, user) {
        const message = await messageModel.create({ text: text, room: room, user: user });
        const userId = user._id

        async function pushMessageToUser() {
            const updatedUser = await userModel.findByIdAndUpdate(userId, { $push : { messages : message._id }}, { new : true });
            return updatedUser;
        }

        pushMessageToUser();
        return message;        
    }

    async pullMessages(room) {
        const pushMessagesFromRoom = await messageModel.find({ room: room }).select('-_id text user');
        return pushMessagesFromRoom.map(char =>( {
            text : char.text,
            user : char.user
        }));
    }


}

export default new chatService;