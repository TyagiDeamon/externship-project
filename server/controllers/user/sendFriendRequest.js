import User from "../../models/User.js";
import axios from "axios";

const sendFriendRequest = async (req, res) => {
	try {
		if (req.body.id === req.params.id) {
			throw { status: 400, message: "Bad request" };
		}

		const sender = await User.findById(req.body.id).select(
			"friends sentRequests blocked"
		);

		if (!sender) {
			throw {
				status: 404,
				message: "Something went wrong! Please login again to continue",
			};
		}

		if (sender.friends.includes(req.params.id)) {
			throw { status: 400, message: "Already friends with the user" };
		}

		if (sender.sentRequests.includes(req.params.id)) {
			throw { status: 400, message: "Already sent a request to the user" };
		}

		if (sender.blocked.includes(req.params.id)) {
			throw {
				status: 400,
				message: "You've blocked this user. Please unblock them and try again",
			};
		}

		const user = await User.findById(req.params.id).select(
			"friends recievedRequests blocked emailVerified username"
		);

		if (!user) {
			throw { status: 404, message: "Account not found" };
		}

		if (!user.emailVerified) {
			throw {
				status: 400,
				message: "Account of this user is not yet activated",
			};
		}

		if (user.blocked.includes(sender._id)) {
			throw { status: 400, message: "You have been blocked by the user" };
		}

		sender.sentRequests.push(user._id);
		await sender.save();

		user.recievedRequests.push(sender._id);
		await user.save();
		await axios.post(`http://localhost:${process.env.PORT}/notification`, {
			sender: req.body.username,
			reciever: user.username,
			content: `${req.body.username} sent you a friend request`,
			type: "request",
		});

		res.status(200).json({
			message: "Friend request sent successfully",
			sentRequests: sender.sentRequests,
		});
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export default sendFriendRequest;
