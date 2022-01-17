import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import axios from "axios";

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

		const uploadResult = await axios.post(
			"http://localhost:7000/media/uploadMedia",
			req.file
		);

		if (uploadResult.status == 500) {
			return res.status(500).json(uploadResult);
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 12);

		const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
			expiresIn: "1d",
		});

		const newUser = await User.create({
			email: req.body.email,
			username: req.body.username,
			password: hashedPassword,
			name: req.body.name,
			avatar: uploadResult.data.secure_url,
			cloudinary_id: uploadResult.data.public_id,
			tempToken: token,
			posts: [],
		});

		await axios.post("http://localhost:6000/email/sendEmail", {
			email: req.body.email,
			subject: "Welcome! Activate your account",
			text: `Hello, please activate your account using the following link: http://localhost:5000/user/emailVerify/${token}`,
		});

		res
			.status(201)
			.json({ newUser, token, message: "Account not yet activated" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default userSignup;
