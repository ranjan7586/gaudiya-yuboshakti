import { Request, Response } from 'express';
import ForumService from '../services/ForumService';

class ForumController {
  async getAllForums(req: Request, res: Response) {
    const forums = await ForumService.getAllForums();
    res.json(forums);
  }

  async getForumById(req: Request, res: Response) {
    const id = req.params.id;
    const forum = await ForumService.getForumById(id);
    res.json(forum);
  }

  async createForum(req: Request, res: Response) {
    const forumData = req.body;
    const newForum = await ForumService.createForum(forumData);
    res.json(newForum);
  }

  async updateForum(req: Request, res: Response) {
    const id = req.params.id;
    const updatedForumData = req.body;
    const updatedForum = await ForumService.updateForum(id, updatedForumData);
    res.json(updatedForum);
  }

  async deleteForum(req: Request, res: Response) {
    const id = req.params.id;
    await ForumService.deleteForum(id);
    res.json({ message: 'Forum deleted successfully' });
  }
}

export default new ForumController();