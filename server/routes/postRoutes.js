import express from "express";
import upload from "../utils/multer.js";
import createPost from "../controllers/post/createPost.js";
import createPrivatePost from "../controllers/post/privatePost.js";

import {
	getUser,
	verifyLogin,
	emailVerified,
} from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/:user_id/:post_id");

router.post("/create", upload.array("image"), verifyLogin, createPost);

export default router;
