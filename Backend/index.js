import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const port = 5000;
const app = express();

app.get("/", (req, res) => {
    res.send("Hello Express");
});

mongoose.set("strictQuery", true);
const connectAsync = () => {
    return new Promise((resolve, reject) => {

        // Connect options - prevent console warnings:
        const options = { useNewUrlParser: true, useUnifiedTopology: true };

        // Connect to MongoDB:
        mongoose.connect(process.env.URI_MONGO, options, (err, db) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(db);
        });
    });
};

connectAsync()
    .then(db => console.log("We're connected to MongoDB."))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});