import User from "../../models/User.js";
import Comment from "../../models/Comment.js";

const likeComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id).select(
			"likes liked_by"
		);
		if (!comment) {
			throw { status: 404, message: "Comment not found" };
		}
		const user = await User.findById(req.body.id).select("username");
		if (!user) {
			throw { status: 404, message: "Please signup or login to continue" };
		}

		if (comment.liked_by.includes(user.username)) {
			return res.status(200).json(comment);
		}

		comment.likes = comment.likes + 1;
		comment.liked_by.push(user.username);

		await comment.save();

		res.status(200).json(comment);
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default likeComment;
