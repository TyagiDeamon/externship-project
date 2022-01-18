import User from "../../models/User.js";

const removeFriend = async (req, res) => {
	try {
		const user1 = await User.findById(req.body.id).select("friends");

		if (!user1.friends.includes(req.params.id)) {
			throw { status: 404, message: "User is not your friend" };
		}

		const user2 = await User.findById(req.params.id).select("friends");

		user1.friends.splice(user1.friends.indexOf(user2.id), 1);
		user2.friends.splice(user2.friends.indexOf(user1.id), 1);

		await user1.save();
		await user2.save();

		res.status(200).json({
			message: "Removed friend successfully",
			user1Friends: user1.friends,
		});
	} catch (err) {
		res.status(err.status || 500).json({ message: err.message });
	}
};

export default removeFriend;
