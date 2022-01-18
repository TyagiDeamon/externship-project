import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import axios from "axios";

const userSignup = async (req, res) => {
	try {
		if (req.body.id) {
			throw {
				status: 400,
				message: "Account already exists with the provided credentials",
			};
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
			tempToken: token,
			posts: [],
		});

		if (req.file?.path) {
			const uploadResult = await axios.post(
				`http://localhost:${MEDIA_PORT}/media/uploadMedia`,
				req.file
			);

			if (uploadResult.status != 200) {
				return res.status(uploadResult.status).json(uploadResult.data);
			}

			newUser.avatar = uploadResult.data.secure_url;
			newUser.cloudinary_id = uploadResult.data.public_id;
		}

		await newUser.save();

		await axios.post(`http://localhost:${EMAIL_PORT}/email/sendEmail`, {
			email: req.body.email,
			subject: "Welcome! Activate your account",
			text: `Hello, please activate your account using the following link: http://localhost:5000/user/emailVerify/${token}`,
		});

		res
			.status(201)
			.json({ newUser, token, message: "Account not yet activated" });
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export default userSignup;
