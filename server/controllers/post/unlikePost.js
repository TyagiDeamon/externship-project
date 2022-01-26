import Post from "../../models/Post.js";
import User from "../../models/User.js";

const unlikePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).select("likes liked_by");
		if (!post) {
			throw { status: 404, message: "Post not found" };
		}
		const user = await User.findById(req.body.id).select("username");
		if (!user) {
			throw { status: 404, message: "Please signup or login to continue" };
		}

		if (!post.liked_by.includes(user.username)) {
			return res.status(200).json(post);
		}

		post.likes = post.likes - 1;
		post.liked_by.splice(post.liked_by.indexOf(user.username), 1);

		await post.save();

		res.status(200).json(post);
	} catch (err) {
		res
			.status(err.status || 200)
			.json({ message: res.message || "Something went wrong" });
	}
};

export default unlikePost;
