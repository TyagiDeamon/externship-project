import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";

const setNewPassword = async (req, res) => {
	const token = req.params.passwordResetToken;
	try {
		const existingUser = await User.findOne({ passwordResetToken: token });

		if (!existingUser) {
			return res
				.status(400)
				.json({ message: "Invalid token or token may has expired" });
		}

		const isValid = jwt.verify(token, "test");

		if (isValid) {
      existingUser.passwordResetToken = false;
      
			const hashedPassword = await bcrypt.hash(req.body.password, 12);
      existingUser.password = hashedPassword;

			await existingUser.save();
		} else {
			return res
				.status(400)
				.json({ message: "Invalid token or token may has expired" });
		}

		res.status(200).json({ existingUser, message: "Password reset successful" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default setNewPassword;
