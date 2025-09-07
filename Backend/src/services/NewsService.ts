import Category from "../models/Category";
import News from "../models/News";
import { uploadToCloudinary } from "../utils/cloudinary";
import Tag from "../models/Tag";

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
        // The News.create method will now correctly handle the 'categories' and 'tags' array.
        const result = await News.create(data.body);
        return result;
    }

    async getNews(page: number, display_per_page: number, sort_by: string, sort_order: any, filter_by: any, filter_type: string) {
        sort_order = sort_order === 'asc' ? 1 : -1;

        interface NewsFilter {
            deletedAt: null;
            categories?: any;
            tags?: any;
        }

        let filterQuery: NewsFilter = { deletedAt: null };
        console.log(filter_type, filter_by)
        if (filter_type && filter_by) {
            if (filter_type === 'category') {
                filter_by = (await Category.findOne({ slug: filter_by.toLowerCase() }).select('_id'))?._id;
                filterQuery.categories = filter_by;
            } else if (filter_type === 'tag') {
                filter_by = (await Tag.findOne({ slug: filter_by }).select('_id'))?._id;
                filterQuery.tags = filter_by;
            }
        }
        console.log(filterQuery)
        // Updated populate to use 'categories' and 'tags'
        const result = await News.find(filterQuery)
            .populate('author', ['name', 'profileImage'])
            .populate('categories', ['name','slug'])
            .populate('tags', 'name')
            .sort({ [sort_by]: sort_order })
            .skip((page - 1) * display_per_page)
            .limit(display_per_page);
        return result;
    }


    async updateNews(data: any) {
        if (data?.file) {
            const result = await uploadToCloudinary(data.file);
            data.body.thumbnail_img = result.url;
            console.log(result);
        }
        // The findOneAndUpdate method will correctly handle the 'categories' and 'tags' array.
        const result = await News.findOneAndUpdate({ _id: data.params.id }, data.body, { new: true });
        return result;
    }

    async deleteNews(id: string) {
        const result = await News.findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true });
        return result;
    }

    async getNewsById(id: string) {
        // Updated populate to use 'categories' and 'tags'
        const result = await News.findOne({ _id: id })
            .populate('author', ['name', 'profileImage'])
            .populate('categories', 'name')
            .populate('tags', 'name');
        return result;
    }
}

export default new NewsService();
