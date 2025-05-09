import express from "express";
import chatController from "../Controllers/chatControllers.js";
import loginController from "../Controllers/userControllers.js";
import loginValidator from "../Validators/login-validation.js";


const routes = express.Router();

routes.post(`/user/create`, [...loginValidator.validateName()], loginController.createUser);

routes.get(`/conversas/getMessages/:room`, chatController.pullMessages, );
routes.post(`/conversas/createMessage`, chatController.createMessage);

export { routes };