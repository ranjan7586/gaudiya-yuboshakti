import express, { Request, Response } from 'express';
import AuthController from '../controllers/AuthController';
import { upload } from '../utils/cloudinary';
const router = express.Router();

router.post('/register', upload.single('profileImage'), async (req: Request, res: Response) => {
    await AuthController.register(req, res);
})

router.post('/login', async (req: Request, res: Response) => {
    await AuthController.login(req, res);
})

export default router;