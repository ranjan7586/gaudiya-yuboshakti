import Category from "../models/Category";
import { Request } from "express";

class CategoryService {
    async getCategories(page: number, display_per_page: number, sort_by: string, sort_order: any) {
        sort_order = sort_order === 'asc' ? 1 : -1;

        const categories = await Category.find({ deletedAt: null })
            .sort({ [sort_by]: sort_order })
            .skip((page - 1) * display_per_page)
            .limit(display_per_page)
            .populate('parentId', ['name', 'slug']) // still populate parentId
            .lean(); // convert to plain JS objects

        // Rename parentId → parent
        return categories.map(cat => ({
            ...cat,
            parent: cat.parentId,
            parentId: undefined, // remove parentId if you don’t want it
        }));
    }

    async createCategory(data: any) {
        if (data?.slug) data.slug = data.slug.toLowerCase();
        // The parentId will be handled automatically if it exists in data
        const category = await Category.create(data);
        return category;
    }

    async getCategoryById(id: string) {
        const category = await Category.findById(id).populate('parentId'); // Populate parent category
        return category;
    }

    async updateCategory(req: Request) {
        const data = req.body;
        if (data?.slug) data.slug = data.slug.toLowerCase();
        // Ensure parentId is not the category's own _id to prevent self-referencing
        if (data.parentId && data.parentId === req.params.id) {
            throw new Error('A category cannot be its own parent.');
        }
        const category = await Category.findByIdAndUpdate(req.params.id, data, { new: true });
        return category;
    }

    async deleteCategory(id: string) {
        const category = await Category.findById(id);
        if (!category) {
            return null;
        }

        // Soft delete the category and any of its children
        const deleteResult = await Category.updateMany({ $or: [{ _id: id }, { parentId: id }] }, { deletedAt: new Date() });
        return deleteResult;
    }
}

export default new CategoryService();