"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const cloudinary_1 = require("../utils/cloudinary");
class AuthService {
    async register(data) {
        const email_exists = await User_1.default.findOne({ email: data.body.email });
        if (email_exists) {
            throw new Error('Email already exists');
        }
        if (data?.file) {
            const result = await (0, cloudinary_1.uploadToCloudinary)(data.file);
            data.body.profileImage = result.url;
        }
        const result = await User_1.default.create(data.body);
        return result;
    }
    async login(data) {
        const user = await User_1.default.findOne({ "email": data?.body?.email });
        if (!user)
            throw new Error('Invalid credentials');
        if (data?.body?.password) {
            const isMatch = await user.comparePassword(data.body.password);
            console.log(isMatch);
            if (!isMatch)
                throw new Error('Invalid credentials');
        }
        const token = this.generateJWT(user._id);
        delete user.password;
        return { user, token };
    }
    async logout(req) {
        const user = await User_1.default.findOne({ _id: req.body.auth_user._id });
        if (!user)
            throw new Error('User not found');
        const token = this.generateJWT(user._id);
        return { user, token };
    }
    generateJWT(id) {
        const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || '', { expiresIn: '1d' });
        return token;
    }
    async roleCheck(id) {
        const user = await User_1.default.findOne({ _id: id }).select('isAdmin');
        if (!user)
            throw new Error('User not found');
        else {
            if (user.isAdmin)
                return 'admin';
            else
                return 'user';
        }
    }
    async getUsers(page, display_per_page, sort_by, sort_order) {
        sort_order = sort_order === 'asc' ? 1 : -1;
        const result = await User_1.default.find().select('-password').sort({ [sort_by]: sort_order }).skip((page - 1) * display_per_page).limit(display_per_page);
        return result;
    }
}
exports.default = new AuthService();
