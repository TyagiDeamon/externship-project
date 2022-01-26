import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
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
	comments: [],
	post_id: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
