import mongoose from "mongoose";
interface INews extends mongoose.Document {
    title: string;
    description: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
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
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    readTime: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
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
