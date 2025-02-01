import express from "express";
import { shortenUrl, redirectUrl, getUrlStatistics } from "../controllers/url.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/shorten", authMiddleware, shortenUrl);
router.get("/:shortUrl", redirectUrl);
router.get("/:shortUrl/stats", authMiddleware, getUrlStatistics);

export default router;
