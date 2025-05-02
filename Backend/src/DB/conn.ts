import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database.
 *
 * @function connectDB
 * @returns {Promise<void>}
 * @throws {Error} If there is an error connecting to the database.
 */
const connectDB = async () => {
    try {
        const mongo_uri: string = process.env.MONGO_URI || 'mongodb://localhost:27017/gaudiya-yuboshakti';
        const conn: any = await mongoose.connect(mongo_uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB