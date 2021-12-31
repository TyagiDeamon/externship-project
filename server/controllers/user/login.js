import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(404).json({ message: "Account does not exist." });
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Incorrect password." });
		}

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			"test",
			{ expiresIn: "1d" }
		);

		res.status(200).json({ result: existingUser, token });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default userLogin;
