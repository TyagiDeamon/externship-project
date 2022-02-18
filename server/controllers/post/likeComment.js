import User from "../../models/User.js";
import Comment from "../../models/Comment.js";
import axios from "axios";

const likeComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id).select(
			"likes liked_by description author post_id"
		);
		if (!comment) {
			throw { status: 404, message: "Comment not found" };
		}
		if (comment.description === "Comment deleted") {
			throw { status: 400, message: "Comment is deleted" };
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
		await axios.post(`http://localhost:${process.env.PORT}/notification`, {
			sender: req.body.username,
			reciever: comment.author,
			post: comment.post_id,
			content: `${req.body.username} liked your comment`,
			type: "like",
		});

		res.status(200).json(comment);
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default likeComment;
