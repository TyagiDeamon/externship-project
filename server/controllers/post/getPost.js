import Post from "../../models/Post.js";
import User from "../../models/User.js";

const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			throw {
				status: 404,
				message: "Post not found",
			};
		}

		const creater = await User.findOne({ username: post.author }).select(
			"friends blocked"
		);

		if (creater.blocked.includes(req.body.id)) {
			throw { status: 400, message: "You have been blocked by the user" };
		}

		if (creater.type === "private" && !creater.friends.includes(req.body.id)) {
			throw {
				status: 400,
				message: "This is a private post. Add friend to see their posts",
			};
		}

		post.views = post.views + 1;
		await post.save();

		res.status(200).json(post);
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default getPost;
