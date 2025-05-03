import io from "../../server.js";
import service from "../Services/chatServices.js";

// const service = new chatService;

class chatController {

    static async createUser(req, res) {
        try {
            const { name } = req.body;

            const newUser = await service.createUser({ name: name});
        
            if (newUser != name) {
                return res.status(400).json({message: "This name already exist in the database"});
            }

            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message : `ERROR in create user: ${error.message}`});
            console.error(error);
        }
    }

    static async pushMessages(req, res) {
        try {
            const { room, user } = req.body;
            const showMessages = await service.pushMessages(room);
            
            io.to(user).emit("load-messages", showMessages);
            
            res.status(200).json({ message : "pushMessages is a sucess"});
            
        } catch (error) {
            res.status(500).json({ message : `ERROR IN pushMessages: ${error.message}` });
        }
    }
}

export default chatController;