import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const removeFriend = async (req, res) => {
	try {
		if (!req.headers.token) {
			return res.status(400).json({ message: "Please login to continue!" });
		}

		const data = jwt.verify(req.headers.token, process.env.SECRET_KEY);

		if (!data) {
			return res.status(400).json({
				message: "Invalid login. PLease login again to continue!",
			});
		}

		const user1 = await User.findById(data.id);

		if (!user1.friends.includes(req.params.id)) {
			return res.status(404).json({ message: "User is not your friend" });
		}

		const user2 = await User.findById(req.params.id);

		user1.friends.splice(user1.friends.indexOf(user2.id), 1);
		user2.friends.splice(user1.friends.indexOf(user1.id), 1);

		await user1.save();
		await user2.save();

		res.status(200).json({
			message: "Removed friend successfully",
			user1Friends: user1.friends,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default removeFriend;
