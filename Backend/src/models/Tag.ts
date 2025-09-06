import mongoose, { Schema } from "mongoose";

interface ITag {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

const tagSchema: Schema = new mongoose.Schema<ITag>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
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

export default mongoose.model<ITag>("Tag", tagSchema);
