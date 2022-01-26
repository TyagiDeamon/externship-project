import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
	description: {
		type: String,
		required: true,
	},
	media: [],
	author: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	liked_by: [],
	comments: [],
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
});

const Post = mongoose.model("Post", postSchema);
export default Post;
