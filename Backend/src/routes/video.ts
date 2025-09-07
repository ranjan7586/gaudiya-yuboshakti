import express from "express";
import { Request, Response } from "express";
import VideoController from "../controllers/VideoController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

router.post("/list", async (req: Request, res: Response) => {
  await VideoController.index(req, res);
});

router.get("/details/:id", async (req: Request, res: Response) => {
  await VideoController.show(req, res);
});

router.use(authMiddleware, adminMiddleware);

router.post("/create", async (req: Request, res: Response) => {
  await VideoController.create(req, res);
});

router.patch("/update/:id", async (req: Request, res: Response) => {
  await VideoController.update(req, res);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  await VideoController.delete(req, res);
});

export default router;
