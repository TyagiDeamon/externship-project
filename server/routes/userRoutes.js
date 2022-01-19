import express from "express";
import upload from "../utils/multer.js";
import userLogin from "../controllers/user/login.js";
import userSignup from "../controllers/user/signup.js";
import getUsers from "../controllers/user/getUsers.js";
import getUserById from "../controllers/user/getUserById.js";
import emailVerify from "../controllers/user/emailVerify.js";
import passwordReset from "../controllers/user/passwordReset.js";
import setNewPassword from "../controllers/user/setNewPassword.js";
import sendFriendRequest from "../controllers/user/sendFriendRequest.js";
import acceptRequest from "../controllers/user/acceptRequest.js";
import rejectRequest from "../controllers/user/rejectRequest.js";
import removeFriend from "../controllers/user/removeFriend.js";
import getAllFriends from "../controllers/user/getAllFriends.js";
import getSentRequests from "../controllers/user/getSentRequests.js";
import getRecievedRequests from "../controllers/user/getRecievedRequests.js";
import getBlocked from "../controllers/user/getBlocked.js";
import blockUser from "../controllers/user/blockUser.js";
import unblockUser from "../controllers/user/unblockUser.js";
import deleteAvatar from "../controllers/user/deleteAvatar.js";
import uploadAvatar from "../controllers/user/uploadAvatar.js";
import suggestFriends from "../controllers/user/suggestFriends.js";

import {
	getUser,
	verifyLogin,
	emailVerified,
} from "../middlewares/user.middleware.js";

const router = express.Router();
// router.use(getUser, emailVerified);

router.get("/emailVerify/:token", emailVerify);

router.get("/getAllFriends", verifyLogin, getAllFriends);
router.get("/getBlocked", verifyLogin, getBlocked);

router.get("/getSentRequests", verifyLogin, getSentRequests);
router.get("/getRecievedRequests", verifyLogin, getRecievedRequests);
router.get("/suggestFriends", verifyLogin, suggestFriends);

router.get("/", getUsers);
router.get("/:id", getUserById);

router.post("/signup", upload.single("image"), getUser, userSignup);
router.post("/login", getUser, emailVerified, userLogin);

router.post("/passwordReset", getUser, emailVerified, passwordReset);
router.post("/setNewPassword/:passwordResetToken", setNewPassword);

router.post("/sendFriendRequest/:id", verifyLogin, sendFriendRequest);
router.post("/acceptRequest/:id", verifyLogin, acceptRequest);
router.post("/rejectRequest/:id", verifyLogin, rejectRequest);
router.post("/removeFriend/:id", verifyLogin, removeFriend);

router.post("/block/:id", verifyLogin, blockUser);
router.post("/unblock/:id", verifyLogin, unblockUser);

router.post("/uploadAvatar", upload.single("image"), verifyLogin, uploadAvatar);

router.delete("/deleteAvatar", verifyLogin, deleteAvatar);

export default router;
