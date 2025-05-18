import { upload } from '../utils/cloudinary';
import express, { Request, Response } from 'express';
import AuthController from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import AuthService from '../services/AuthService';

const router = express.Router();

router.post('/register', upload.single('profileImage'), async (req: Request, res: Response) => {
    await AuthController.register(req, res);
})

router.post('/login', async (req: Request, res: Response) => {
    await AuthController.login(req, res);
})

router.post('/users', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    await AuthController.index(req, res);
})

router.post('/role-check', authMiddleware, async (req: Request, res: Response) => {
    await AuthController.roleCheck(req, res);
})

export default router;