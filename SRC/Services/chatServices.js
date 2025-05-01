
import messageModel from "../Models/messageModel.js";

class chatService {
    async showMessages(room) {
        const messages = await messageModel.find({ origin: room });
        return messages.map(item => ({
            text: item.text,
            user: item.user,
            origin: item.origin
        }));
    }
}

export default chatService;