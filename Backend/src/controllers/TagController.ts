import { Request, Response } from "express";
import TagService from "../services/TagService";

class TagController {
    async index(req: Request, res: Response) {
        try {
            const page = req.body?.page || 1;
            const sort_by = req.body?.sort_by || 'date';
            const sort_order = req.body?.sort_order || 'desc';
            const display_per_page = req.body?.display_per_page || 10;
            const result = await TagService.getTags(page, display_per_page, sort_by, sort_order);
            return res.status(200).json({ message: 'Tags fetched successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            if (!req.body) return res.status(400).json({ message: 'No data provided' });
            const required_fields = ['name', 'slug'];
            const missing_fields = required_fields.filter((field) => !req.body[field]);
            if (missing_fields.length > 0) {
                return res.status(400).json({ message: `Missing required fields: ${missing_fields.join(', ')}` });
            }
            const result = await TagService.createTag(req.body);
            return res.status(200).json({ message: 'Tag created successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const result = await TagService.getTagById(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Tag not found' });
            }
            return res.status(200).json({ message: 'Tag fetched successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            if (!req.body) return res.status(400).json({ message: 'No data provided' });
            const required_fields = ['name', 'slug'];
            const missing_fields = required_fields.filter((field) => !req.body[field]);
            if (missing_fields.length > 0) {
                return res.status(400).json({ message: `Missing required fields: ${missing_fields.join(', ')}` });
            }
            const result = await TagService.updateTag(req);
            if (!result) {
                return res.status(404).json({ message: 'Tag not found' });
            }
            return res.status(200).json({ message: 'Tag updated successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await TagService.deleteTag(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Tag not found' });
            }
            return res.status(200).json({ message: 'Tag deleted successfully', data: true });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }
}

export default new TagController();
