import express from 'express';
import { Request, Response } from 'express';
import CategoryController from '../controllers/CategoryController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
const router = express.Router();

router.post('/list', async (req: Request, res: Response) => {
    await CategoryController.index(req, res);
})

router.get('/:id', async (req: Request, res: Response) => {
    await CategoryController.show(req, res);
})

router.use(authMiddleware, adminMiddleware);
router.post('/create', async (req: Request, res: Response) => {
    await CategoryController.create(req, res);
})

router.patch('/update/:id', async (req: Request, res: Response) => {
    await CategoryController.update(req, res);
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
    await CategoryController.delete(req, res);
})

export default router

