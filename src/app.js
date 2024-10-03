import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
const app = express();

app.use(cors({
    // which types origin can accept
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));


app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true, limit: "10kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRouter  from './routes/user.routes.js';
app.use("/api/v1/users",userRouter); 

// http://localhost:8000/users/register
// http://localhost:8000/users/login
// http://localhost:8000/api/v1/users/register

export {app}