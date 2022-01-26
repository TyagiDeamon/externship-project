import Comment from "../../models/Comment.js";

const deleteComment = async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(
			req.params.id,
			{ new: true },
			{
				description: "Comment deleted",
			}
		);

		res.status(200).json(comment);
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Somthing went wrong" });
	}
};

export default deleteComment;
