"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("../utils/cloudinary");
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const router = express_1.default.Router();
router.post('/register', cloudinary_1.upload.single('profileImage'), async (req, res) => {
    await AuthController_1.default.register(req, res);
});
router.post('/login', async (req, res) => {
    await AuthController_1.default.login(req, res);
});
router.post('/users', authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware, async (req, res) => {
    await AuthController_1.default.index(req, res);
});
router.post('/role-check', authMiddleware_1.authMiddleware, async (req, res) => {
    await AuthController_1.default.roleCheck(req, res);
});
exports.default = router;
