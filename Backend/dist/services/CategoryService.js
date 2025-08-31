"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../models/Category"));
class CategoryService {
    async getCategories(page, display_per_page, sort_by, sort_order) {
        sort_order = sort_order === 'asc' ? 1 : -1;
        const categories = await Category_1.default.find({ deletedAt: null }).sort({ [sort_by]: sort_order }).skip((page - 1) * display_per_page).limit(display_per_page);
        return categories;
    }
    async createCategory(data) {
        if (data?.slug)
            data.slug = data.slug.toLowerCase();
        const category = await Category_1.default.create(data);
        return category;
    }
    async getCategoryById(id) {
        const category = await Category_1.default.findById(id);
        return category;
    }
    async updateCategory(data) {
        if (data?.slug)
            data.slug = data.slug.toLowerCase();
        const category = await Category_1.default.findByIdAndUpdate(data.params.id, data.body, { new: true });
        return category;
    }
    async deleteCategory(id) {
        const category = await Category_1.default.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
        return category;
    }
}
exports.default = new CategoryService();
