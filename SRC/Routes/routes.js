import express from "express";
import controllers from "../Controllers/chatControllers.js";

const routes = express.Router();

routes.post(`/user/create`, controllers.createUser);
routes.get(`/conversas/getMessages/:room`, controllers.pushMessages);
routes.post(`/conversas/postMessage`, controllers.postMessage);


export { routes };