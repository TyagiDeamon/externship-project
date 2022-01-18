import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import axios from "axios";
import "dotenv/config";

const passwordReset = async (req, res) => {
	try {
		const existingUser = await User.findById(req.body.id).select("email");

		if (!existingUser) {
			throw { status: 404, message: "Account not found" };
		}

		const token = jwt.sign({ id: req.body.id }, process.env.SECRET_KEY, {
			expiresIn: "1d",
		});

		await axios.post(
			`http://localhost:${process.env.EMAIL_PORT}/email/sendEmail`,
			{
				email: existingUser.email,
				subject: "Password reset",
				text: `Hello, use the following link to set your new password. http://localhost:5000/user/setNewPassword/${token}`,
			}
		);

		res
			.status(200)
			.json({ token: token, message: "Use this token to reset password" });
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export default passwordReset;
