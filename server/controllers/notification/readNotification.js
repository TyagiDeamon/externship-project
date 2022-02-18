import Notification from "../../models/Notification.js";

const readNotification = async (req, res) => {
	try {
		const temp = await Notification.findById(req.params.id).select("reciever");

		if (!temp) {
			throw { status: 401, message: "Notification not found" };
		}

		if (temp.reciever !== req.body.username) {
			throw { status: 401, message: "Unauthorized" };
		}
		const notification = await Notification.findByIdAndUpdate(
			req.params.id,
			{ read: true },
			{ new: true }
		);

		res.status(200).json(notification);
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default readNotification;
