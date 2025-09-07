import express, { Request, Response } from "express";
import ContactController from "../controllers/ContactController";

const router = express.Router();

// Create new contact
router.post("/create", async (req: Request, res: Response) => {
    await ContactController.create(req, res)
});

export default router;
