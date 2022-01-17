import express from "express";
import cors from "cors";

import mediaRoutes from "../routes/mediaRoutes.js";

const app = express();
app.use(cors());

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.options("*", cors());

app.get("/ping", (req, res) => {
	res.status(200).json({ ping: "pong" });
});

app.use("/media", mediaRoutes);

export default app;
