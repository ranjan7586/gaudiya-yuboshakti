import express from 'express';
import ForumController from '../controllers/ForumController';

const router = express.Router();

router.get('/', ForumController.getAllForums);
router.get('/:id', ForumController.getForumById);
router.post('/', ForumController.createForum);
router.put('/:id', ForumController.updateForum);
router.delete('/:id', ForumController.deleteForum);

export default router;