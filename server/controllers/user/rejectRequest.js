import User from "../../models/User.js";

const rejectRequest = async (req, res) => {
	try {
		const user1 = await User.findById(req.body.id).select("recievedRequests");

		if (!user1.recievedRequests.includes(req.params.id)) {
			throw { status: 404, message: "User didn't send a friend request" };
		}

		const user2 = await User.findById(req.params.id).select("sentRequests");

		user1.recievedRequests.splice(user1.recievedRequests.indexOf(user2.id), 1);
		user2.sentRequests.splice(user2.sentRequests.indexOf(user1.id), 1);

		await user1.save();
		await user2.save();

		res.status(200).json({
			message: "Rejected request successfully",
		});
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export default rejectRequest;
