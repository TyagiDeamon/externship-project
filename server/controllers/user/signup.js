import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const userSignup = async (req, res) => {
	try {
		const existingUser = await User.findOne({
			$or: [
				{
					email: req.body.email,
				},
				{
					username: req.body.username,
				},
			],
		});

		if (existingUser) {
			return res.status(400).json({
				message: "Account already exists with the provided credentials.",
			});
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 12);

		const token = jwt.sign({ email: req.body.email }, "test", {
			expiresIn: "1d",
		});

		const newUser = await User.create({
			email: req.body.email,
			username: req.body.username,
			password: hashedPassword,
			name: req.body.name,
			tempToken: token,
			posts: [],
		});

		res
			.status(201)
			.json({ newUser, token, message: "Account not yet activated" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default userSignup;
