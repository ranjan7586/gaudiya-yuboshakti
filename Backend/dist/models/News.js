"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const newsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: String,
        required: true
    },
    readTime: {
        type: String,
        required: false
    },
    thumbnail_img: {
        type: String,
        required: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});
const News = mongoose_1.default.model("News", newsSchema);
exports.default = News;
