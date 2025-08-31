"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
        required: false
    },
    bio: {
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
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt_1.default.hash(this.password, 10);
    next();
});
userSchema.methods.comparePassword = async function (password) {
    console.log(password, this.password);
    return await bcrypt_1.default.compare(password, this.password);
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
