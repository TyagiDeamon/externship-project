import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		liked_by: [],
		comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
		post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
