import jwt from "jsonwebtoken";
import User from "../models/User";
import { uploadToCloudinary } from "../utils/cloudinary";

class AuthService {
    async register(data: any) {
        const email_exists = await User.findOne({ email: data.body.email });
        if (email_exists) {
            throw new Error('Email already exists');
        }
        if (data?.file) {
            const result = await uploadToCloudinary(data.file);
            data.body.profileImage = result.url;
        }
        const result = await User.create(data.body);
        return result;
    }

    async login(data: any) {
        const user = await User.findOne({ "email": data?.body?.email });
        if (!user) throw new Error('Invalid credentials');
        if (data?.body?.password) {
            const isMatch = await user.comparePassword(data.body.password);
            console.log(isMatch)
            if (!isMatch) throw new Error('Invalid credentials');
        }
        const token = this.generateJWT(user._id);
        delete (user as any).password;
        return { user, token };
    }

    generateJWT(id: any) {
        const token = jwt.sign({ id }, process.env.JWT_SECRET || '', { expiresIn: '1d' });
        return token;
    }

    async roleCheck(id: any) {
        const user = await User.findOne({ _id: id }).select('isAdmin');
        if (!user) throw new Error('User not found');
        else {
            if (user.isAdmin) return 'admin';
            else return 'user';
        }
    }

    async getUsers(page: number, display_per_page: number, sort_by: string, sort_order: any) {
        sort_order = sort_order === 'asc' ? 1 : -1;
        const result = await User.find().select('-password').sort({ [sort_by]: sort_order }).skip((page - 1) * display_per_page).limit(display_per_page);
        return result;
    }
}

export default new AuthService();