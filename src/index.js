import dotenv from "dotenv";
import connectMongoDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
    path:'./.env'
});

// here we are making promises like if db connected then run server will be running on port
connectMongoDB()
.then(()=>{
    app.listen(process.env.PORT || 3000 ,()=>{
                    console.log(`Listening on port ${process.env.PORT}`)
                    app.on("error" ,(error)=>{
                                    console.error(error);
                                    throw error;
                                });
                })
})
.catch((error)=>{
    console.log(error);
    process.exit(1);
})

































































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