import User from "../../models/User.js";

const getUserById = async (req, res) => {
	try {
		const existingUser = await User.findById({ _id: req.params.id });

		if (!existingUser) {
			throw { status: 400, message: "Account not found" };
		}

		res.status(200).json(existingUser);
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export default getUserById;
