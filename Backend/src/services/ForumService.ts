import Forum from "../models/Forum";

class ForumService {
    async getForums(page: number, display_per_page: number, sort_by: string, sort_order: any) {
        sort_order = sort_order === 'asc' ? 1 : -1;
        const forums = await Forum.find({ deletedAt: null }).populate('author', ['name', 'profileImage']).sort({ [sort_by]: sort_order }).skip((page - 1) * display_per_page).limit(display_per_page);
        return forums;
    }

    async createForum(data: any) {
        const forum = await Forum.create(data);
        return forum;
    }

    async getForumById(id: string) {
        const forum = await Forum.findOne({ _id: id, deletedAt: null }).populate('author', ['name', 'profileImage']);
        return forum;
    }

    async updateForum(data: any) {
        const forum = await Forum.findOneAndUpdate({ _id: data.params.id }, data.body, { new: true });
        return forum;
    }

    async deleteForum(id: string) {
        const forum = await Forum.findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true });
        return forum;
    }
}

export default new ForumService();