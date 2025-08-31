"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = require("../utils/cloudinary");
const router = express_1.default.Router();
// Route for single file upload
router.post('/single', cloudinary_1.upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        const result = await (0, cloudinary_1.uploadToCloudinary)(req.file);
        res.status(200).json({
            message: 'File uploaded successfully',
            data: result
        });
    }
    catch (error) {
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
exports.default = router;
