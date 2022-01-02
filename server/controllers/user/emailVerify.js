import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const emailVerify = async (req, res) => {
	const token = req.params.token;
	try {
		const existingUser = await User.findOne({ tempToken: token });

		if (!existingUser) {
			return res
				.status(400)
				.json({ message: "Invalid token or token may has expired" });
		}

		if (existingUser.emailVerified) {
			return res.status(400).json({ message: "Account already activated" });
		}

		const isValid = jwt.verify(token, "test");

		if (isValid) {
			existingUser.emailVerified = true;
			existingUser.tempToken = false;

			await existingUser.save();
		} else {
			return res
				.status(400)
				.json({ message: "Invalid token or token may has expired" });
		}

		res.status(200).json({ existingUser, message: "Account activated" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default emailVerify;
