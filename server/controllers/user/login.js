import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import "dotenv/config";

const userLogin = async (req, res) => {
	const { password } = req.body;
	try {
		const existingUser = await User.findById(req.body.id);
		if (!existingUser) {
			throw { status: 404, message: "Account not found" };
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect) {
			throw { status: 400, message: "Incorrect password" };
		}

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			process.env.SECRET_KEY,
			{ expiresIn: "1d" }
		);

		res.status(200).json({ result: existingUser, token });
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export default userLogin;
