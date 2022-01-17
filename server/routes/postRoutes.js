import express from "express";
import createPublicPost from "../controllers/post/publicPost.js";
import createPrivatePost from "../controllers/post/privatePost.js";

const router = express.Router();

router.get("/:user_id/:post_id");

router.post("/public/:user_id", createPublicPost);

router.post("/private/:user_id", createPrivatePost);

router.delete("/:user_id/:post_id");

router.patch("/:user_id/:post_id");

export default router;
