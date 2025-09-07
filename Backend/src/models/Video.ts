import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
    title: string;
    description?: string;
    youtubeUrl: string;
    categories: mongoose.Types.ObjectId[];
    tags: mongoose.Types.ObjectId[];
    date: string;
    createdAt: Date;
    updatedAt: Date;
}

const videoSchema = new Schema<IVideo>(
    {
        title: { type: String, required: true },
        description: { type: String },
        youtubeUrl: { type: String, required: true },
        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
        date: { type: String, default: String(Date.now) },
    },
    { timestamps: true }
);

export default mongoose.model<IVideo>("Video", videoSchema);
