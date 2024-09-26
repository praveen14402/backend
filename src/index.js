import dotenv from "dotenv";
import connectMongoDB from "./db/index.js";
import express from "express";

dotenv.config({
    path:'./.env'
});


connectMongoDB();

































































// import mongoose from "mongoose";
// import {DB_NAME}  from "../src/constants.js";
// import express from "express";


// const app = express();



// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         app.on("error" ,(error)=>{
//             console.error(error);
//             throw error;
//         });
//         app.listen(process.env.PORT, () => console.log (`Listening on port ${process.env.PORT}`));
//     }
//     catch (error) {
//         console.error(error);
//         throw err;
//     }
// }
// )();