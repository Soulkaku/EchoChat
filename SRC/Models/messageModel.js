import mongoose from "mongoose";
// import user from "./userModel.js";

const messageModel = new mongoose.Schema({

    text : { type : String, required: true },
    user : { type : mongoose.Schema.Types.ObjectId, ref: "user"},
    room : { type : String },

}, { versionKey: false });

export default mongoose.model("message", messageModel);