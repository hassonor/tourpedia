import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectAsync } from "./dal/dal.js";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello Express");
});

mongoose.set("strictQuery", true);

connectAsync()
    .then(db => console.log("We're connected to MongoDB."))
    .catch(err => console.log(err));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});