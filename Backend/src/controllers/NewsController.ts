import { Request, Response } from "express";
import NewsService from "../services/NewsService";

class NewsController {
    async create(req: Request, res: Response) {
        try {
            if (!req.body) return res.status(400).json({ message: 'No data provided' });
            const require_arr = ['title', 'description', 'author', 'category', 'date',];
            const missing_fields = require_arr.filter((field) => req.body[field] === undefined || !req.body[field]);
            if (missing_fields.length > 0) {
                return res.status(400).json({ message: `Missing required fields: ${missing_fields.join(', ')}` });
            }
            const result = await NewsService.createNews(req);
            return res.status(200).json({ message: 'News created successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async index(req: Request, res: Response) {
        try {
            const page = req.body?.page || 1;
            const sort_by = req.body?.sort_by || 'date';
            const filter_by = req.body?.filterBy || '';
            const filter_type = req.body?.filterType || '';
            const sort_order = req.body?.sort_order || 'desc';
            const display_per_page = req.body?.display_per_page || 10;
            const result = await NewsService.getNews(page, display_per_page, sort_by, sort_order, filter_by, filter_type);
            return res.status(200).json({ message: 'News fetched successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            if (!req.body) return res.status(400).json({ message: 'No data provided' });
            /*
            const require_arr = ['title', 'description', 'author', 'category', 'date'];
            const missing_fields = require_arr.filter((field) => req.body[field] === undefined || !req.body[field]);
            if (missing_fields.length > 0) {
                return res.status(400).json({ message: `Missing required fields: ${missing_fields.join(', ')}` });
            }*/
            const result = await NewsService.updateNews(req);
            return res.status(200).json({ message: 'News updated successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await NewsService.deleteNews(req.params.id);
            return res.status(200).json({ message: 'News deleted successfully', data: true });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const result = await NewsService.getNewsById(req.params.id);
            return res.status(200).json({ message: 'News fetched successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
}


export default new NewsController();