import Category from "../models/Category";
import { Request } from "express";

class CategoryService {

    async getCategories(
        page: number,
        display_per_page: number,
        sort_by: string,
        sort_order: any,
        get_childs: boolean,
        parent_slug: string | null
    ) {
        sort_order = sort_order === 'asc' ? 1 : -1;
        let filterQuery: any = {};

        // If we are looking for children, find the parent ID by slug
        if (get_childs && parent_slug) {
            const parentCategory = await Category.findOne({ slug: parent_slug }).select('_id');
            if (parentCategory) {
                filterQuery.parentId = parentCategory._id;
            } else {
                return []; // No parent found, so no children
            }
        } else {
            // If not getting children, only show top-level categories
            // filterQuery.parentId = null;
        }
        filterQuery.deletedAt = null;
        const categories = await Category.find(filterQuery)
            .populate('parentId', ['name', 'slug'])
            .sort({ [sort_by]: sort_order })
            .skip((page - 1) * display_per_page)
            .limit(display_per_page)
            .lean();

        // Ensure the populated parent is a clean object
        return categories.map(cat => ({
            ...cat,
            parent: cat.parentId,
            parentId: undefined
        }));
    }

    async createCategory(data: any) {
        if (data.parentId === "") {
            data.parentId = null;
        }
        if (data?.slug) {
            data.slug = data.slug.toLowerCase().replace(/\s+/g, "-");
        }        // The parentId will be handled automatically if it exists in data
        const category = await Category.create(data);
        return category;
    }

    async getCategoryById(id: string) {
        const category = await Category.findById(id).populate('parentId'); // Populate parent category
        return category;
    }

    async updateCategory(req: Request) {
        const data = req.body;
        if (data?.slug) {
            data.slug = data.slug.toLowerCase().replace(/\s+/g, "-");
        }        // Ensure parentId is not the category's own _id to prevent self-referencing
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