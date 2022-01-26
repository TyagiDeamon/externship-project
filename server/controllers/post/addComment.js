import Post from "../../models/Post.js";
import User from "../../models/User.js";
import Comment from "../../models/Comment.js";

const addComment = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).select("comments");

		if (!post) {
			throw { status: 404, message: "Post not found" };
		}

		const user = await User.findById(req.body.id).select("username");

		if (!user) {
			throw { status: 404, message: "Please signup or login to continue" };
		}

		const comment = await Comment.create({
			description: req.body.description,
			author: user.username,
			post_id: req.params.id,
		});

		await post.comments.push(comment._id);
		await post.save();

		res.status(200).json({ comment, post });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Somthing went wrong" });
	}
};

export default addComment;
