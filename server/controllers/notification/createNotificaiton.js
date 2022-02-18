import Notification from "../../models/Notification.js";

const createNotification = async (req, res) => {
	try {
		const notification = await Notification.create({
			sender: req.body.sender,
			reciever: req.body.reciever,
			post: req.body.post,
			content: req.body.content,
			type: req.body.type,
		});

		res.status(201).json(notification);
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default createNotification;
