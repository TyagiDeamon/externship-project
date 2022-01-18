import axios from "axios";
import User from "../../models/User.js";

const deleteAvatar = async (req, res) => {
	try {
		const user = await User.findById(req.body.id);

		if (!user) {
			throw { status: 404, message: "Please signup or login to continue" };
		}

		if (!user.cloudinary_id) {
			throw { status: 400, message: "Bad request" };
		}

		const deleteResult = await axios.post(
			`http://localhost:${MEDIA_PORT}/media/uploadMedia`,
			{ id: user.cloudinary_id }
		);

		if (deleteResult.status != 200) {
			return res.status(uploadResult.status).json(uploadResult.data);
		}

		user.avatar = null;
		user.cloudinary_id = null;

		await user.save();

		res.status(200).json({ message: "Avatar deleted successfully" });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default deleteAvatar;
