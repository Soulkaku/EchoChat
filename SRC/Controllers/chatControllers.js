import io from "../../server.js";
import service from "../Services/chatServices.js";

// const service = new chatService;

class chatController {
    static async createMessage(req, res) {
        try {
            const { text, room, user } = req.body;

            const createMessage = await service.createMessage(text, room, user);

            if(createMessage) {
                io.in(room).emit( "create-message", createMessage);
            }

            res.status(200).json("A message was created for this room");
        } catch (error) {
            res.status(400).json({message: `Error in creating message: ${error.message} `});
        }
    }

    static async pullMessages(req, res) {
        try {
            const room = req.params.room;
            const messages = await service.pullMessages(room);

            console.log(messages);

            res.status(200).json(messages);
            
        } catch (error) {
            res.status(500).json({ message: `ERROR in pushing messages from a room: ${error.message}`});
        }
    }
}

export default chatController;