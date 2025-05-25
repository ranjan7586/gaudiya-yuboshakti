import mongoose from "mongoose"

interface ICategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const categorySchema: mongoose.Schema = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
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

export default mongoose.model("Category", categorySchema);