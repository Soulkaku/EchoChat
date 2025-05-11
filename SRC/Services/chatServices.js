import messageModel from "../Models/messageModel.js";
import userModel from "../Models/userModel.js";
class chatService {
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