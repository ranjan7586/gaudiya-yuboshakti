import mongoose from "mongoose";

// Interface for the News model
interface INews extends mongoose.Document {
    title: string;
    description: string;
    author: mongoose.Schema.Types.ObjectId;
    // Modified to be an array of ObjectIds to allow a single post to have multiple categories.
    categories: mongoose.Schema.Types.ObjectId[];
    date: string;
    tags: mongoose.Schema.Types.ObjectId[];
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
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: false
    }],
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

const News = mongoose.model<INews>("News", newsSchema);
export default News;
