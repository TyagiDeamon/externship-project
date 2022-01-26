import axios from "axios";
import Post from "../../models/Post.js";
import User from "../../models/User.js";

const createPost = async (req, res) => {
	try {
		const user = await User.findById(req.body.id).select("username");

		if (!user) {
			throw { status: 404, message: "Please signup or login to continue" };
		}

		const uploadResult = await axios.post(
			`http://localhost:${process.env.MEDIA_PORT}/media/uploadMultiple`,
			req.files
		);

		if (uploadResult.status != 200) {
			throw {
				status: uploadResult.status,
				message: uploadResult.data.message,
			};
		}

		let newPost = await Post.create({
			description: req.body.description,
			author: user.username,
			media: uploadResult.data,
		});

		res.status(200).json(newPost);
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default createPost;
