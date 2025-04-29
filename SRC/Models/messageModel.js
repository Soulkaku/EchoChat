import mongoose from "mongoose";

const messageModel = new mongoose.Schema({

    text : { type : String, required: true },
    // user : { type : String, required: true },
    origin : { type : String },

}, { versionKey: false });

const message = mongoose.model("chat", messageModel);