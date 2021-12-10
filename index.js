import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(cors());



app.listen(process.env.PORT, () => {
    console.log(`Server started on port, ${process.env.PORT}`)
})