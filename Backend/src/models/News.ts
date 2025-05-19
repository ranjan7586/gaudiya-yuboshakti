import mongoose from "mongoose";
interface INews extends mongoose.Document {
    title: string;
    description: string;
    category: string;
    author: mongoose.Schema.Types.ObjectId;
    date: string;
    tags: string[];
    readTime: string;
    thumbnail_img: string;
    deletedAt: Date;
}

const newsSchema: mongoose.Schema = new mongoose.Schema<INews>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
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
})

const News = mongoose.model("News", newsSchema);
export default News
