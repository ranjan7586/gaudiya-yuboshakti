import { NextFunction, Request, Response } from "express"
import AuthService from "../services/AuthService";
export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body?.auth_user?.id) {
            const role = await AuthService.roleCheck(req.body?.auth_user?.id);
            if (role === 'admin') next();
            else {
                res.status(401).json({ message: 'Unauthorized: Authentication failed' });
                return
            }
        } else {
            res.status(401).json({ message: 'Unauthorized: Authentication failed' });
            return
        }
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        return;
    }
}