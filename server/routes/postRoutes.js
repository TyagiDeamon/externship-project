import express from "express";
import upload from "../utils/multer.js";
import createPost from "../controllers/post/createPost.js";
import likePost from "../controllers/post/likePost.js";
import unlikePost from "../controllers/post/unlikePost.js";
import addComment from "../controllers/post/addComment.js";
import deleteComment from "../controllers/post/deleteComment.js";
import addReply from "../controllers/post/addReply.js";
import likeComment from "../controllers/post/likeComment.js";

import {
	getUser,
	verifyLogin,
	emailVerified,
} from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/:user_id/:post_id");

router.post("/create", upload.array("image"), verifyLogin, createPost);

router.patch("/like/:id", verifyLogin, likePost);

router.patch("/unlike/:id", verifyLogin, unlikePost);

router.patch("/addComment/:id", verifyLogin, addComment);

router.patch("/deleteComment/:id", verifyLogin, deleteComment);

router.patch("/addReply/:id", verifyLogin, addReply);

router.patch("/likeComment/:id", verifyLogin, likeComment);

export default router;
