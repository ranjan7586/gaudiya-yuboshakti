import Tag from "../models/Tag";
import { Request } from "express";

class TagService {
    async getTags(page: number, display_per_page: number, sort_by: string, sort_order: any) {
        sort_order = sort_order === 'asc' ? 1 : -1;
        const tags = await Tag.find({ deletedAt: null })
            .sort({ [sort_by]: sort_order })
            .skip((page - 1) * display_per_page)
            .limit(display_per_page);
        return tags;
    }

    async createTag(data: any) {
        if (data?.slug) data.slug = data.slug.toLowerCase();
        const tag = await Tag.create(data);
        return tag;
    }

    async getTagById(id: string) {
        const tag = await Tag.findById(id);
        return tag;
    }

    async updateTag(req: Request) {
        const data = req.body;
        if (data?.slug) data.slug = data.slug.toLowerCase();
        const tag = await Tag.findByIdAndUpdate(req.params.id, data, { new: true });
        return tag;
    }

    async deleteTag(id: string) {
        const tag = await Tag.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
        return tag;
    }
}

export default new TagService();
