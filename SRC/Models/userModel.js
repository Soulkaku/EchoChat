import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: { type: String, required: true},
    //password: {type: String, required: true},
   messages : [{ type : mongoose.Schema.Types.ObjectId, ref: "message" }]
}, {versionKey : false });

export default mongoose.model("user", userModel);
