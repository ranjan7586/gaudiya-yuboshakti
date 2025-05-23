import { Request, Response } from "express";
import CategoryService from "../services/CategoryService";

class CategoryController {
    async index(req: Request, res: Response) {
        try {
            const page = req.body?.page || 1;
            const sort_by = req.body?.sort_by || 'date';
            const sort_order = req.body?.sort_order || 'desc';
            const display_per_page = req.body?.display_per_page || 10;
            const result = await CategoryService.getCategories(page, display_per_page, sort_by, sort_order);
            return res.status(200).json({ message: 'Categories fetched successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            if (!req.body) return res.status(400).json({ message: 'No data provided' });
            const require_arr = ['name'];
            const missing_fields = require_arr.filter((field) => req.body[field] === undefined || !req.body[field]);
            if (missing_fields.length > 0) {
                return res.status(400).json({ message: `Missing required fields: ${missing_fields.join(', ')}` });
            }
            const result = await CategoryService.createCategory(req.body);
            return res.status(200).json({ message: 'Category created successfully', data: result });

        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const result = await CategoryService.getCategoryById(req.params.id);
            return res.status(200).json({ message: 'Category fetched successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            if (!req.body) return res.status(400).json({ message: 'No data provided' });
            const require_arr = ['name'];
            const missing_fields = require_arr.filter((field) => req.body[field] === undefined || !req.body[field]);
            if (missing_fields.length > 0) {
                return res.status(400).json({ message: `Missing required fields: ${missing_fields.join(', ')}` });
            }
            const result = await CategoryService.updateCategory(req);
            return res.status(200).json({ message: 'Category updated successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await CategoryService.deleteCategory(req.params.id);
            return res.status(200).json({ message: 'Category deleted successfully', data: true });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }
}

export default new CategoryController();