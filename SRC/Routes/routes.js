import express from "express";
import chatController from "../Controllers/chatControllers.js";
import loginController from "../Controllers/userControllers.js";
import loginValidator from "../Validators/login-validation.js";
import chatValidator from "../Validators/chat-validation.js";

const routes = express.Router();

routes.post(`/user/create`, [...loginValidator.validateName()], loginController.createUser);

routes.get(`/conversas/getMessages/:room`, [...chatValidator.validateRoom] , chatController.pullMessages, );
routes.post(`/conversas/createMessage`, [...chatValidator.validateTextMessage] , chatController.createMessage);

export { routes };