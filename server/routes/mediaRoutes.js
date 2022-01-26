import express from "express";
import upload from "../utils/multer.js";
import uploadMedia from "../controllers/media/uploadMedia.js";
import uploadMultiple from "../controllers/media/uploadMultiple.js";
import deleteMedia from "../controllers/media/deleteMedia.js";

const router = express.Router();

router.post("/uploadMedia", upload.single("image"), uploadMedia);

router.post("/uploadMultiple", upload.single("image"), uploadMultiple);

router.delete("/deleteMedia/:id", deleteMedia);

export default router;
