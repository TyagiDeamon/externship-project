import User from "../../models/User.js";

const getSentRequests = async (req, res) => {
	try {
		const user = await User.findById(req.body.id).select("sentRequests");

		if (!user) {
			throw { status: 404, message: "Account not found" };
		}

		res.status(200).send(user.sentRequests);
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong!" });
	}
};

export default getSentRequests;
