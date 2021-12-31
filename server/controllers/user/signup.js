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

		const newUser = await User.create({
			email: req.body.email,
			username: req.body.username,
			password: hashedPassword,
			name: req.body.name,
			posts: [],
		});

		const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
			expiresIn: "1d",
		});

		res.status(201).json({ newUser, token });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default userSignup;