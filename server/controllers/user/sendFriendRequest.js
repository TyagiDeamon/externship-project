import User from "../../models/User.js";

const sendFriendRequest = async (req, res) => {
	try {
		if (req.body.id === req.params.id) {
			throw { status: 400, message: "Bad request" };
		}

		const sender = await User.findById(req.body.id);

		if (!sender) {
			return res.status(404).json({
				message: "Something went wrong! Please login again to continue",
			});
		}

		if (sender.friends.includes(req.params.id)) {
			throw { status: 400, message: "Already friends with the user" };
		}

		if (sender.sentRequests.includes(req.params.id)) {
			throw { status: 400, message: "Already sent a request to the user" };
		}

		const user = await User.findById(req.params.id);

		if (!user) {
			throw { status: 404, message: "Account not found" };
		}

		sender.sentRequests.push(user._id);
		await sender.save();

		user.recievedRequests.push(sender._id);
		await user.save();

		res.status(200).json({
			message: "Friend request sent successfully",
			sentRequests: sender.sentRequests,
		});
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export default sendFriendRequest;
