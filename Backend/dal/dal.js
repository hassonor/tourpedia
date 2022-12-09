import mongoose from "mongoose";

export function connectAsync() {
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



