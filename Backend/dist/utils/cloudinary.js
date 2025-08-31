"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadToCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
dotenv_1.default.config();
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
// ✅ Correct async wrapper for cloudinary.upload_stream
const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({ folder: 'Gyuvayuboshakti' }, (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                return reject(error);
            }
            resolve(result);
        });
        // Convert buffer to readable stream and pipe to Cloudinary
        stream_1.Readable.from(file.buffer).pipe(stream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const deleteFromCloudinary = async (public_id) => {
    try {
        const result = await cloudinary_1.v2.uploader.destroy(public_id);
        return result;
    }
    catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw new Error('Failed to delete file from Cloudinary');
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
