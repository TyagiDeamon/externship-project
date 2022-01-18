import User from "../../models/User.js";

const blockUser = async (req, res) => {
	try {
		const user = await User.findById(req.body.id);

		if (!user) {
			throw { status: 404, message: "Please signup or login to continue" };
		}

		if (user._id == req.params.id) {
			throw { status: 400, message: "Bad request" };
		}

		if (user.blocked.includes(req.params.id)) {
			throw { status: 400, message: "User is already blocked" };
		}

		user.blocked.push(req.params.id);

		const user2 = await User.findById(req.params.id);

		if (user.friends.includes(req.params.id)) {
			user.friends.splice(user.friends.indexOf(req.params.id), 1);
			user2.friends.splice(user2.friends.indexOf(user._id), 1);
		}

		if (user.recievedRequests.includes(req.params.id)) {
			user.recievedRequests.splice(user.recievedRequests.indexOf(user2._id), 1);
			user2.sentRequests.splice(user2.sentRequests.indexOf(user._id), 1);
		}

		if (user.sentRequests.includes(req.params.id)) {
			user.sentRequests.splice(user.sentRequests.indexOf(user2._id), 1);
			user2.recievedRequests.splice(
				user2.recievedRequests.indexOf(user._id),
				1
			);
		}

		await user.save();
		await user2.save();

		res
			.status(200)
			.json({ blocked: user.blocked, message: "User blocked successfully" });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong!" });
	}
};

export default blockUser;
