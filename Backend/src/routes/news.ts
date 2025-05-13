import express, { Request, Response } from 'express';
import NewsController from '../controllers/NewsController';
import { upload } from '../utils/cloudinary';
const router = express.Router();


router.post('/list', async (req: Request, res: Response) => {
    await NewsController.index(req, res);
});

router.post('/create', upload.single('thumbnail_img'), async (req: Request, res: Response) => {
    await NewsController.create(req, res);
})

router.patch('/update/:id', upload.single('thumbnail_img'), async (req: Request, res: Response) => {
    await NewsController.update(req, res);
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
    await NewsController.delete(req, res);
})




export default router