import Notification from "../../models/Notification.js";

const getNotifications = async (req, res) => {
	try {
		const { page, perPage } = req.query;
		if (!page) page = 1;
		if (!perPage) perPage = 20;
		const skip = perPage * (page - 1);
		const notifications = await Notification.find({ reciever: req.body.id })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(perPage)
			.exec();

		res.status(200).json({
			notifications: notifications,
		});
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default getNotifications;
