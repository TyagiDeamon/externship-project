import express from "express";
import upload from "../utils/multer.js";
import userLogin from "../controllers/user/login.js";
import userSignup from "../controllers/user/signup.js";
import getUserById from "../controllers/user/getUserById.js";
import emailVerify from "../controllers/user/emailVerify.js";
import passwordReset from "../controllers/user/passwordReset.js";
import setNewPassword from "../controllers/user/setNewPassword.js";

const router = express.Router();

router.post("/signup", upload.single("image"), userSignup);

router.post("/login", userLogin);

router.get("/emailVerify/:token", emailVerify);

router.get("/:id", getUserById);

router.post("/passwordReset", passwordReset);

router.post("/setNewPassword/:passwordResetToken", setNewPassword);

export default router;
