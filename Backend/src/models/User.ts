import { profile } from "console";
import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    profileImage: string;
    bio: string;
    deletedAt: Date;
}

const userSchema: mongoose.Schema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;