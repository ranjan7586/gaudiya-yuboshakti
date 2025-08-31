"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NewsController_1 = __importDefault(require("../controllers/NewsController"));
const cloudinary_1 = require("../utils/cloudinary");
const router = express_1.default.Router();
router.post('/list', async (req, res) => {
    await NewsController_1.default.index(req, res);
});
router.post('/create', cloudinary_1.upload.single('thumbnail_img'), async (req, res) => {
    await NewsController_1.default.create(req, res);
});
router.patch('/update/:id', cloudinary_1.upload.single('thumbnail_img'), async (req, res) => {
    await NewsController_1.default.update(req, res);
});
router.delete('/delete/:id', async (req, res) => {
    await NewsController_1.default.delete(req, res);
});
router.get('/:id', async (req, res) => {
    await NewsController_1.default.show(req, res);
});
exports.default = router;
