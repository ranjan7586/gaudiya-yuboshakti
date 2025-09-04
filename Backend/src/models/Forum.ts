import mongoose from "mongoose";

interface IForum extends mongoose.Document {
    title: string;
    description: string;
    author: mongoose.Schema.Types.ObjectId;
    date: string;
    tags: string[];
    readTime: string;
    thumbnail_img: string;
    deletedAt: Date;
}

const forumSchema: mongoose.Schema = new mongoose.Schema<IForum>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
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


forumSchema.pre<IForum>("save", async function (next) {
    console.log("enter")
    if(!this.date) this.date = new Date().toString();
    next();
})

const Forum = mongoose.model("Forum", forumSchema);
export default Forum;