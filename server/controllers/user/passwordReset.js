import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const passwordReset = async (req, res) => {
	try {
		const existingUser = await User.findOne({ email: req.body.email });

		if (!existingUser) {
			return res.status(404).json({ message: "Account not found" });
		}

		const token = jwt.sign({ email: req.body.email }, "test", {
			expiresIn: "1d",
		});

		existingUser.passwordResetToken = token;

		await existingUser.save();

		res.status(200).json({ token: token, message: "Use this token to reset password" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default passwordReset;
