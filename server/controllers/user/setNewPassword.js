import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import "dotenv/config";

const setNewPassword = async (req, res) => {
	const token = req.params.passwordResetToken;
	try {
		const isValid = jwt.verify(token, process.env.SECRET_KEY);

		if (isValid) {
			const existingUser = await User.findById(isValid.id);

			if (!existingUser) {
				throw {
					status: 400,
					message: "Invalid token or token may has expired",
				};
			}
			
			const hashedPassword = await bcrypt.hash(req.body.password, 12);
			existingUser.password = hashedPassword;

			await existingUser.save();
		} else {
			throw { status: 400, message: "Invalid token or token may has expired" };
		}

		res
			.status(200)
			.json({ message: "Password reset successful" });
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export default setNewPassword;
