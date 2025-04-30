import mongoose from "mongoose";

async function connectWithDb() {
    console.log(process.env.DB_CONNECTION_STRING);
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    
    return mongoose.connection;
}

export { connectWithDb };