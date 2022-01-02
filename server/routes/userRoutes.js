import express from "express";
import userLogin from "../controllers/user/login.js";
import userSignup from "../controllers/user/signup.js";
import getUserById from "../controllers/user/getUserById.js";
import emailVerify from "../controllers/user/emailVerify.js";

const router = express.Router();

router.post("/signup", userSignup);

router.post("/login", userLogin);

router.get("/emailVerify/:token", emailVerify);

router.get("/:id", getUserById);

export default router;
