import Post from "../../models/Post.js";
import User from "../../models/User.js";
import axios from "axios";

const sharePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).select("author");

		if (!post) {
			throw { status: 404, message: "Post not found" };
		}

		const author = await User.findOne({ username: post.author }).select(
			"blocked"
		);

		if (author.blocked.includes(req.body.id)) {
			throw { status: 400, message: "You have been blocked by the user" };
		}

		const user = await User.findById(req.body.id).select("posts");

		if (!user) {
			throw { status: 404, message: "Please signup or login to continue" };
		}

		await user.posts.push(req.params.id);
		await user.save();
		await axios.post(`http://localhost:${process.env.PORT}/notification`, {
			sender: req.body.username,
			reciever: post.author,
			post: req.params.id,
			content: `${req.body.username} shared your post`,
			type: "share",
		});

		res.status(200).json({ user });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default sharePost;
