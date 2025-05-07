import io from "../../server.js";
import service from "../Services/chatServices.js";

// const service = new chatService;

class chatController {

    static async createUser(req, res) {
        try {
            const { name } = req.body;

            const newUser = await service.createUser({ name: name});

            if (!newUser) {
                return res.status(400).json({message: "This name already exist in the database"});
            }
            
            res.status(201).json(newUser);
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

    // static async pushMessages(req, res) {
    //     try {
    //         const room = req.params.room;
    //         const showMessages = await service.showMessages(room);
    //         console.log(showMessages);

    //         res.status(200).json(showMessages);
    //     } catch (error) {
    //         res.status(500).json({ messsage : `ERROR in pushing messages: ${error.message}`});
    //     }
    // }

    // static async createMessage(req, res) {
    //     try {
    //         const { text, room, user } = req.body;

    //         const createMessage = await service.createMessage(text, room, user);
    //         console.log(createMessage);

    //     } catch(error) {
    //         res.status(400).json({ message : `ERROR in creating your message: ${error.message}`});
    //     }
    // }
}

export default chatController;