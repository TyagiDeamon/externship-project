import express from "express";
import upload from "../utils/multer.js";
import uploadMedia from "../controllers/media/uploadMedia.js";

const router = express.Router();

router.post("/uploadMedia", upload.single("image"), uploadMedia);

export default router;