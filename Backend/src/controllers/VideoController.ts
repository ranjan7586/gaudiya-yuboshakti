import { Request, Response } from "express";
import VideoService from "../services/VideoService";

class VideoController {
  async index(req: Request, res: Response) {
    try {
      const page = req.body?.page || 1;
      const sort_by = req.body?.sort_by || "date";
      const sort_order = req.body?.sort_order || "desc";
      const display_per_page = req.body?.display_per_page || 10;

      const result = await VideoService.getVideos(page, display_per_page, sort_by, sort_order);
      return res.status(200).json({ message: "Videos fetched successfully", data: result });
    } catch (error) {
      return res.status(500).json({ message: error instanceof Error ? error.message : "Unknown server error" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      if (!req.body.title || !req.body.youtubeUrl) {
        return res.status(400).json({ message: "Missing required fields: title, youtubeUrl" });
      }
      const result = await VideoService.createVideo(req.body);
      return res.status(200).json({ message: "Video created successfully", data: result });
    } catch (error) {
      return res.status(500).json({ message: error instanceof Error ? error.message : "Unknown server error" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const result = await VideoService.getVideoById(req.params.id);
      if (!result) return res.status(404).json({ message: "Video not found" });
      return res.status(200).json({ message: "Video fetched successfully", data: result });
    } catch (error) {
      return res.status(500).json({ message: error instanceof Error ? error.message : "Unknown server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await VideoService.updateVideo(req);
      if (!result) return res.status(404).json({ message: "Video not found" });
      return res.status(200).json({ message: "Video updated successfully", data: result });
    } catch (error) {
      return res.status(500).json({ message: error instanceof Error ? error.message : "Unknown server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await VideoService.deleteVideo(req.params.id);
      if (!result) return res.status(404).json({ message: "Video not found" });
      return res.status(200).json({ message: "Video deleted successfully", data: true });
    } catch (error) {
      return res.status(500).json({ message: error instanceof Error ? error.message : "Unknown server error" });
    }
  }
}

export default new VideoController();
