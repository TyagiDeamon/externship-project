import User from "../../models/User.js";

const getUserById = async (req, res) => {
	try {
		const existingUser = await User.findById({ _id: req.params.id });

		if (!existingUser) {
			return res.status(404).json({ message: "Account not found" });
		}

		res.status(200).json(existingUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default getUserById;
