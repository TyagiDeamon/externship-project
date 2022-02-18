import User from "../../models/User.js";
import Comment from "../../models/Comment.js";
import axios from "axios";

const addReply = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id).select(
			"comments description author"
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

		const newComment = await Comment.create({
			description: req.body.description,
			author: user.username,
			post_id: req.params.id,
		});

		await comment.comments.push(newComment._id);
		await comment.save();
		await axios.post(`http://localhost:${process.env.PORT}/notification`, {
			sender: req.body.username,
			reciever: comment.author,
			post: newComment.post_id,
			content: `${req.body.username} replied to your comment`,
			type: "reply",
		});

		res.status(200).json({ newComment, comment });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Somthing went wrong" });
	}
};

export default addReply;
