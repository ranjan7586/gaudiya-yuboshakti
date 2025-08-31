"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Auth middleware to check if the request has a valid authentication token.
 *
 * It takes the token from the Authorization header and verifies it against the secret key defined in the environment.
 * If the token is valid, it adds the authenticated user to the request body and calls the next middleware.
 * If the token is invalid or not provided, it returns a 401 Unauthorized response.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const authMiddleware = async (req, res, next) => {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || '';
    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Unauthorized: Invalid token' });
            return;
        }
        if (!req.body)
            req.body = {};
        req.body.auth_user = decoded;
        next();
    });
};
exports.authMiddleware = authMiddleware;
