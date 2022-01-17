import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import userRoutes from "../routes/userRoutes.js";
import postRoutes from "../routes/postRoutes.js";

const app = express();
app.use(cors());

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.options("*", cors());

app.get("/ping", (req, res) => {
	res.status(200).json({ ping: "pong" });
});

app.use("/user", userRoutes);
app.use("/post", postRoutes);

mongoose.connect(
	process.env.MONGO_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("Connected to MongoDB!");
	}
);

export default app;
