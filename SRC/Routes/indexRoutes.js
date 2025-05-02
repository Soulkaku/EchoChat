import express from "express";
import { routes } from "./routes.js";

const index = (app => {
    app.use(express.json(), routes);
});

export default index;