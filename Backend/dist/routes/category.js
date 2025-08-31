"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminMiddleware_1 = require("../middlewares/adminMiddleware");
const router = express_1.default.Router();
router.post('/list', async (req, res) => {
    await CategoryController_1.default.index(req, res);
});
router.get('/details/:id', async (req, res) => {
    await CategoryController_1.default.show(req, res);
});
router.use(authMiddleware_1.authMiddleware, adminMiddleware_1.adminMiddleware);
router.post('/create', async (req, res) => {
    await CategoryController_1.default.create(req, res);
});
router.patch('/update/:id', async (req, res) => {
    await CategoryController_1.default.update(req, res);
});
router.delete('/delete/:id', async (req, res) => {
    await CategoryController_1.default.delete(req, res);
});
exports.default = router;
