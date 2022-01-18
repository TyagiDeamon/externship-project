import User from "../../models/User.js";

const unblockUser = async (req, res) => {
	try {
		const user = await User.findById(req.body.id).select("blocked");

		if (!user) {
			throw { status: 404, message: "Please signup or login to continue" };
		}

		if (user._id === req.params.id) {
			throw { status: 404, message: "Bad request" };
		}

		if (!user.blocked.includes(req.params.id)) {
			throw { status: 400, message: "User is not blocked" };
		}

		user.blocked.splice(user.blocked.indexOf(req.params.id), 1);

		await user.save();

		res
			.status(200)
			.json({ blocked: user.blocked, message: "User unblocked successfully" });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong!" });
	}
};

export default unblockUser;
