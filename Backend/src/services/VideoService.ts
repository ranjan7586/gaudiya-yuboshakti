import Video from "../models/Video";
import { Request } from "express";

class VideoService {
    async getVideos(page: number, display_per_page: number, sort_by: string, sort_order: string) {
        const sortValue = sort_order === "asc" ? 1 : -1;

        return await Video.find()
            .populate("categories", ["name", "slug"])
            .populate("tags", ["name", "slug"])
            .sort({ [sort_by]: sortValue })  // ✅ now number type
            .skip((page - 1) * display_per_page)
            .limit(display_per_page)
            .lean();
    }


    async createVideo(data: any) {
        const video = await Video.create(data);
        return video;
    }

    async getVideoById(id: string) {
        return await Video.findById(id).populate("categories tags");
    }

    async updateVideo(req: Request) {
        return await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    }

    async deleteVideo(id: string) {
        return await Video.findByIdAndDelete(id);
    }
}

export default new VideoService();
