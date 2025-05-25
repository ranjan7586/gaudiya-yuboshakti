import Category from "../models/Category";

class CategoryService {
    async getCategories(page: number, display_per_page: number, sort_by: string, sort_order: any) {
        sort_order = sort_order === 'asc' ? 1 : -1;
        const categories = await Category.find({ deletedAt: null }).sort({ [sort_by]: sort_order }).skip((page - 1) * display_per_page).limit(display_per_page);
        return categories;
    }

    async createCategory(data: any) {
        if(data?.slug) data.slug = data.slug.toLowerCase();
        const category = await Category.create(data);
        return category;
    }

    async getCategoryById(id: string) {
        const category = await Category.findById(id);
        return category;
    }

    async updateCategory(data: any) {
        if(data?.slug) data.slug = data.slug.toLowerCase();
        const category = await Category.findByIdAndUpdate(data.params.id, data.body, { new: true });
        return category;
    }

    async deleteCategory(id: string) {
        const category = await Category.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
        return category;
    }
}

export default new CategoryService();