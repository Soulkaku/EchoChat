import express from "express";
import controllers from "../Controllers/chatControllers.js";

const routes = express.Router();

routes.get(`/conversas`, controllers.pushMessages);
// routes.post(`/conversas/post`, controllers.postMessage);


export { routes };