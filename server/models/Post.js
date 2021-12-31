import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	author_name: {
		type: String,
		default: "Anonymous",
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

const Post = mongoose.model("Post", postSchema);
export default Post;
