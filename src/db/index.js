import mongoose from "mongoose";
import {DB_NAME}  from "../constants.js";



const connectMongoDB = async () => {

    try { 
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\n MongoDB Connected !! DB HOST: ${connectInstance.connection.host}`);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectMongoDB;