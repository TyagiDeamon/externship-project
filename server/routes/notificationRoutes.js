import express from "express";
import getNotifications from "../controllers/notification/getNotifications.js";
import createNotification from "../controllers/notification/createNotificaiton.js";
import deleteNotification from "../controllers/notification/deleteNotification.js";
import readNotification from "../controllers/notification/readNotification.js";
import { verifyLogin } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/", verifyLogin, getNotifications);

router.post("/", createNotification);

router.patch("/:id", readNotification);

router.delete("/:id", verifyLogin, deleteNotification);

export default router;
