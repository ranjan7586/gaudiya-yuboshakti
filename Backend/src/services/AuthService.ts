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
        if(data?.body?.password){
            
        }
        const result = await User.findOne({ email: data.body.email, password: data.body.password });
        return result;
    }
}

export default new AuthService();