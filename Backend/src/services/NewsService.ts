import Category from "../models/Category";
import News from "../models/News";
import { uploadToCloudinary } from "../utils/cloudinary";

class NewsService {
    constructor() { }

    /**
     * Creates a new news item
     * @param {any} data - News item data. If data.file exists, it will be uploaded to Cloudinary and the
     * thumbnail_img field will be set to the uploaded image URL.
     * @returns {Promise<News>} - The newly created news item
     */
    async createNews(data: any) {
        if (data?.file) {
            const result = await uploadToCloudinary(data.file);
            data.body.thumbnail_img = result.url;
            console.log(result);
        }
        // data.body.author = data.body?.auth_user?.id;
        const result = await News.create(data.body);
        return result;
    }

    async getNews(page: number, display_per_page: number, sort_by: string, sort_order: any, filter_by: any, filter_type: string) {
        sort_order = sort_order === 'asc' ? 1 : -1;
        if (filter_type && filter_by) {
            if(filter_type === 'category') filter_by = (await Category.findOne({ name: filter_by }).select('_id'))?._id ; 
            const result = await News.find({ [filter_type]: filter_by, deletedAt: null }).populate('author', ['name', 'profileImage']).populate('category', 'name').sort({ [sort_by]: sort_order }).skip((page - 1) * display_per_page).limit(display_per_page);
            return result;
        }
        const result = await News.find({ deletedAt: null }).populate('author', ['name', 'profileImage']).populate('category', 'name').sort({ [sort_by]: sort_order }).skip((page - 1) * display_per_page).limit(display_per_page);
        return result;
    }

    async updateNews(data: any) {
        if (data?.file) {
            const result = await uploadToCloudinary(data.file);
            data.body.thumbnail_img = result.url;
            console.log(result);
        }
        const result = await News.findOneAndUpdate({ _id: data.params.id }, data.body, { new: true });
        return result;
    }

    async deleteNews(id: string) {
        const result = await News.findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true });
        return result;
    }

    async getNewsById(id: string) {
        const result = await News.findOne({ _id: id }).populate('author', ['name', 'profileImage']).populate('category', 'name');
        return result;
    }
}

export default new NewsService();