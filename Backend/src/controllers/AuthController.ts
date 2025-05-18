import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
    async register(req: Request, res: Response) {
        try {
            if (!req.body) return res.status(400).json({ message: 'No data provided' });
            const require_arr = ['name', 'email', 'password', 'confirm_password'];
            const missing_fields = require_arr.filter((field) => req.body[field] === undefined || !req.body[field]);
            if (missing_fields.length > 0) {
                return res.status(400).json({ message: `Missing required fields: ${missing_fields.join(', ')}` });
            }
            if (req.body.password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' });
            if (req.body.password !== req.body.confirm_password) return res.status(400).json({ message: 'Password does not match' });
            const result = await AuthService.register(req);
            return res.status(200).json({ message: 'User registered successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            if (!req.body) return res.status(400).json({ message: 'No data provided' });
            const require_arr = ['email', 'password'];
            const missing_fields = require_arr.filter((field) => req.body[field] === undefined || !req.body[field]);
            if (missing_fields.length > 0) {
                return res.status(400).json({ message: `Missing required fields: ${missing_fields.join(', ')}` });
            }
            const result = await AuthService.login(req);
            return res.status(200).json({ message: 'User logged in successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    async index(req: Request, res: Response) {
        try {
            const page = req.body?.page || 1;
            const sort_by = req.body?.sort_by || 'date';
            const sort_order = req.body?.sort_order || 'desc';
            const display_per_page = req.body?.display_per_page || 10;
            const result = await AuthService.getUsers(page, display_per_page, sort_by, sort_order);
            return res.status(200).json({ message: 'Users fetched successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }

    async roleCheck(req: Request, res: Response) {
        try {
            const result = await AuthService.roleCheck(req.body?.auth_user?.id);
            return res.status(200).json({ message: 'Role checked successfully', data: result });
        } catch (error) {
            return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        }
    }
}

export default new AuthController();