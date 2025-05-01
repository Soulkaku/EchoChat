import io from "../../server.js";
import service from "../Services/chatServices.js";

class chatController {

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