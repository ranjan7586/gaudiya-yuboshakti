import ForumModel from '../models/Forum';
import { Document } from 'mongoose';

class ForumService {
  async getAllForums(): Promise<any[]> {
    return await ForumModel.find().exec();
  }

  async getForumById(id: string): Promise<any> {
    return await ForumModel.findById(id).exec();
  }

  async createForum(forumData: any): Promise<any> {
    const newForum = new ForumModel(forumData);
    return await newForum.save();
  }

  async updateForum(id: string, updatedForumData: any): Promise<any> {
    return await ForumModel.findByIdAndUpdate(id, updatedForumData, { new: true }).exec();
  }

  async deleteForum(id: string):  Promise<Document<any> | null> {
    const deletedPost = await ForumModel.findByIdAndDelete(id);
    return deletedPost;  }
}

export default new ForumService();