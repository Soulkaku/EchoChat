import io from "../../server.js";
import service from "../Services/chatServices.js";

// const service = new chatService;

class chatController {

    static async createUser(req, res) {
        try {
            const { name } = req.body;

            const User = await service.createUser({ name: name});

            // if (!User) {
            //     return res.status(400).json({message: "This name already exist in the database"});
            // }
            
            res.status(201).json(User);
        } catch (error) {
            res.status(500).json({ message : `ERROR in create user: ${error.message}`});
            console.error(error);
        }
    }

    static async createMessage(req, res) {
        try {
            const { text, room, user } = req.body;

            const createMessage = await service.createMessage(text, room, user);

            res.status(200).json(createMessage);
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