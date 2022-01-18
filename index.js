import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import user from "./resources/user/user.router.js";
import location from "./resources/location/location.router.js";
import morgan from "morgan";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";

import dotenv from "dotenv";
dotenv.config();

const connectionString =
  "mongodb+srv://dcicampers:0000@freshbnb.nsjh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(connectionString);
mongoose.connection.on("open", () =>
  console.log("Database connection established!")
);
mongoose.connection.on("error", () => console.error);

const app = express();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/location", location);
app.use(globalErrorHandler);

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
