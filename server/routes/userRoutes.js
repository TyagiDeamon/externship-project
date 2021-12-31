import express from "express";
import userLogin from "../controllers/user/login.js";
import userSignup from "../controllers/user/signup.js";

const router = express.Router();

router.post("/signup", userSignup);

router.post("/login", userLogin);

export default router;
