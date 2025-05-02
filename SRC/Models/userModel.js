import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: { type: String, required: true},
    //password: {type: String, required: true},

}, {versionKey : false });

export default mongoose.model("user", userModel);
