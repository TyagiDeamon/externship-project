import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const getUser = async (req, res, next) => {
	try {
		const existingUser = await User.findOne({
			$or: [
				{ email: req.body.email },
				{ username: req.body.username },
				{ _id: req.body.id },
			],
		}).select("_id");

		if (existingUser) {
			req.body.id = existingUser._id;
		}

		next();
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export const verifyLogin = async (req, res, next) => {
	try {
		if (!req.headers.token) {
			throw {
				status: 400,
				message: "Please login to continue!",
			};
		}

		const data = jwt.verify(req.headers.token, process.env.SECRET_KEY);

		if (!data) {
			throw {
				status: 400,
				message: "Invalid login. Please login again to continue",
			};
		}

		req.body.id = data.id;

		next();
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export const emailVerified = async (req, res, next) => {
	try {
		const user = await User.findById(req.body.id).select("emailVerified");

		if (!user) {
			throw { status: 404, message: "Account not found" };
		}

		if (!user.emailVerified) {
			throw { status: 400, message: "Account not yet activated" };
		}

		next();
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};
