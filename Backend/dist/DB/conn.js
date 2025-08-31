"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Establishes a connection to the MongoDB database.
 *
 * @function connectDB
 * @returns {Promise<void>}
 * @throws {Error} If there is an error connecting to the database.
 */
const connectDB = async () => {
    try {
        const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/gaudiya-yuboshakti';
        const conn = await mongoose_1.default.connect(mongo_uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.default = connectDB;
