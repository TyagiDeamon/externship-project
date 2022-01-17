import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const sendFriendRequest = async (req, res) => {
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
		const senderId = data.id;

		const sender = await User.findById(senderId);

		if (!sender) {
			return res.status(404).json({
				message: "Something went wrong! Please login again to continue",
			});
		}

		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({
				message: "Account not found",
			});
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
		res.status(500).json({ message: err.message });
	}
};

export default sendFriendRequest;
