import service from "../Services/loginServices.js";

class loginControllers {
    static async createUser(req, res) {
        try {
            const { name } = req.body;

            const User = await service.createUser({ name: name});

            res.status(201).json(User);
        } catch (error) {
            res.status(500).json({ message : `ERROR in create user: ${error.message}`});
            console.error(error);
        }
    }
}

export default loginControllers;