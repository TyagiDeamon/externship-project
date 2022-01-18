import User from "../../models/User.js";
import axios from "axios";

const uploadAvatar = async (req, res) => {
	try {
		if (!req.file || !req.file.path) {
			throw { status: 400, message: "No file selected" };
		}

		const user = await User.findById(req.body.id).select(
			"cloudinary_id avatar"
		);

		if (!user) {
			throw { status: 404, message: "Please signup or login to continue" };
		}

		if (user.cloudinary_id) {
			const deleteResult = await axios.delete(
				`http://localhost:${process.env.MEDIA_PORT}/media/deleteMedia/${user.cloudinary_id}`
			);

			if (deleteResult.status != 200) {
				return res.status(uploadResult.status).json(uploadResult.data);
			}

			user.avatar = null;
			user.cloudinary_id = null;
		}

		const uploadResult = await axios.post(
			`http://localhost:${process.env.MEDIA_PORT}/media/uploadMedia`,
			req.file
		);

		if (uploadResult.status != 200) {
			return res.status(uploadResult.status).json(uploadResult.data);
		}

		user.avatar = uploadResult.data.secure_url;
		user.cloudinary_id = uploadResult.data.public_id;

		await user.save();

		res.status(200).json({ message: "Avatar uploaded successfully" });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default uploadAvatar;
