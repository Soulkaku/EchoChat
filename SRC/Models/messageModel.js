import mongoose from "mongoose";

const messageModel = new mongoose.Schema({

    text : { type : String, required: true },
    user : { type : Object, required: true },
    origin : { type : String },

}, { versionKey: false });

// const message = mongoose.model("chat", messageModel);
// export default message ;

export default mongoose.model("chat", messageModel);