"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const AuthService_1 = __importDefault(require("../services/AuthService"));
const adminMiddleware = async (req, res, next) => {
    try {
        if (req.body?.auth_user?.id) {
            const role = await AuthService_1.default.roleCheck(req.body?.auth_user?.id);
            if (role === 'admin')
                next();
            else {
                res.status(401).json({ message: 'Unauthorized: Authentication failed' });
                return;
            }
        }
        else {
            res.status(401).json({ message: 'Unauthorized: Authentication failed' });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown server error' });
        return;
    }
};
exports.adminMiddleware = adminMiddleware;
