import express, { Request, Response } from 'express';
import ForumController from '../controllers/ForumController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = express.Router();
router.post('/list', async (req: Request, res: Response) => {
    await ForumController.index(req, res);
});

router.get('/details/:id', async (req: Request, res: Response) => {
    await ForumController.show(req, res);
});

router.use(authMiddleware, adminMiddleware);
router.post('/create', async (req: Request, res: Response) => {
    await ForumController.create(req, res);
});

router.patch('/update/:id', async (req: Request, res: Response) => {
    await ForumController.update(req, res);
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    await ForumController.delete(req, res);
});

export default router;