import express from "express";
import chat from "../Controllers/chatControllers.js";
import login from "../Controllers/userControllers.js";

const routes = express.Router();

routes.post(`/user/create`, login.createUser);

routes.get(`/conversas/getMessages/:room`, chat.pullMessages);
routes.post(`/conversas/createMessage`, chat.createMessage);

export { routes };