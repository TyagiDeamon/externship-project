import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

const getComments = async (req, res) => {
	try {
		const page = req.params.page ? req.params.page : 1;
		const limit = req.params.perPage ? req.params.perPage : 20;
		const skip = limit * (page - 1);

		if (!mongoose.Types.ObjectId.isValid(req.params.post_id)) {
			throw { status: 404, message: "Invalid post id" };
		}

		const { comments } = await Post.findById(req.params.post_id)
			.populate("comments")
			.slice("comments", [skip, limit]);

		res.status(200).json({ comments });
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something went wrong" });
	}
};

export default getComments;
