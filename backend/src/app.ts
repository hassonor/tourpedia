import express, {Application} from 'express';
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routes/userRouter";
import tourRouter from "./routes/tourRouter";
import connectAsync from "./dal/dal";


dotenv.config();
const app: Application = express();

app.use(morgan("dev"));
app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({limit: "25mb", extended: true}));
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/tours", tourRouter);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello Express");
});

mongoose.set("strictQuery", true);

connectAsync();


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});