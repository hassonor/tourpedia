import mongoose from "mongoose";

const connectAsync = () => {
    const options: any = {useNewUrlParser: true, useUnifiedTopology: true};
    // Connect to MongoDB:
    mongoose.connect(process.env.URI_MONGO).then(db => console.log("We're connected to MongoDB."))
        .catch(err => console.log(err));

}

export default connectAsync;



