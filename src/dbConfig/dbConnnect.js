
import mongoose from 'mongoose';

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongo database");
    } catch (error) {
        console.log("Error while connecting to mongodb", error);
    }
}

export default connectToMongoDB;
