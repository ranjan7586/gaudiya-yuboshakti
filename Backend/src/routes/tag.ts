import express from 'express';
import { Request, Response } from 'express';
import TagController from '../controllers/TagController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
const router = express.Router();

router.post('/list', async (req: Request, res: Response) => {
    await TagController.index(req, res);
});

router.get('/details/:id', async (req: Request, res: Response) => {
    await TagController.show(req, res);
});

router.use(authMiddleware, adminMiddleware);
router.post('/create', async (req: Request, res: Response) => {
    await TagController.create(req, res);
});

router.patch('/update/:id', async (req: Request, res: Response) => {
    await TagController.update(req, res);
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
    await TagController.delete(req, res);
});

export default router;
