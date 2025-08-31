"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../models/Category"));
const News_1 = __importDefault(require("../models/News"));
const cloudinary_1 = require("../utils/cloudinary");
class NewsService {
    constructor() { }
    /**
     * Creates a new news item
     * @param {any} data - News item data. If data.file exists, it will be uploaded to Cloudinary and the
     * thumbnail_img field will be set to the uploaded image URL.
     * @returns {Promise<News>} - The newly created news item
     */
    async createNews(data) {
        if (data?.file) {
            const result = await (0, cloudinary_1.uploadToCloudinary)(data.file);
            data.body.thumbnail_img = result.url;
            console.log(result);
        }
        // data.body.author = data.body?.auth_user?.id;
        const result = await News_1.default.create(data.body);
        return result;
    }
    async getNews(page, display_per_page, sort_by, sort_order, filter_by, filter_type) {
        sort_order = sort_order === 'asc' ? 1 : -1;
        if (filter_type && filter_by) {
            if (filter_type === 'category')
                filter_by = (await Category_1.default.findOne({ name: filter_by }).select('_id'))?._id;
            const result = await News_1.default.find({ [filter_type]: filter_by, deletedAt: null }).populate('author', ['name', 'profileImage']).populate('category', 'name').sort({ [sort_by]: sort_order }).skip((page - 1) * display_per_page).limit(display_per_page);
            return result;
        }
        const result = await News_1.default.find({ deletedAt: null }).populate('author', ['name', 'profileImage']).populate('category', 'name').sort({ [sort_by]: sort_order }).skip((page - 1) * display_per_page).limit(display_per_page);
        return result;
    }
    async updateNews(data) {
        if (data?.file) {
            const result = await (0, cloudinary_1.uploadToCloudinary)(data.file);
            data.body.thumbnail_img = result.url;
            console.log(result);
        }
        const result = await News_1.default.findOneAndUpdate({ _id: data.params.id }, data.body, { new: true });
        return result;
    }
    async deleteNews(id) {
        const result = await News_1.default.findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true });
        return result;
    }
    async getNewsById(id) {
        const result = await News_1.default.findOne({ _id: id }).populate('author', ['name', 'profileImage']).populate('category', 'name');
        return result;
    }
}
exports.default = new NewsService();
