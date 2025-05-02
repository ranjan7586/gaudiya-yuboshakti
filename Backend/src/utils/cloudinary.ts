import multer from 'multer';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

// ✅ Correct async wrapper for cloudinary.upload_stream
export const uploadToCloudinary = (file: Express.Multer.File): Promise<any> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'Gyuvayuboshakti' },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return reject(error);
                }
                resolve(result);
            }
        );

        // Convert buffer to readable stream and pipe to Cloudinary
        Readable.from(file.buffer).pipe(stream);
    });
};

export const deleteFromCloudinary = async (public_id: string) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw new Error('Failed to delete file from Cloudinary');
    }
};
