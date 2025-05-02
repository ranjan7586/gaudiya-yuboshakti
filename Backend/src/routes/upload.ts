import express,{ Request, Response } from 'express';
import { upload, uploadToCloudinary } from '../utils/cloudinary';

const router = express.Router();

// Route for single file upload
router.post('/single', upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        const result = await uploadToCloudinary(req.file);
        res.status(200).json({
            message: 'File uploaded successfully',
            data: result
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            message: 'Error uploading file',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Route for multiple file upload
// router.post('/multiple', upload.array('files', 5), async (req, res) => {
//     try {
//         if (!req.files || !Array.isArray(req.files)) {
//             return res.status(400).json({ message: 'No files uploaded' });
//         }

//         const uploadPromises = req.files.map(file => uploadToCloudinary(file));
//         const results = await Promise.all(uploadPromises);

//         res.status(200).json({
//             message: 'Files uploaded successfully',
//             data: results
//         });
//     } catch (error) {
//         console.error('Upload error:', error);
//         res.status(500).json({
//             message: 'Error uploading files',
//             error: error instanceof Error ? error.message : 'Unknown error'
//         });
//     }
// });

export default router; 