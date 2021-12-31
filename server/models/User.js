import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	email_verified: {
		type: Boolean,
		default: false,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
	posts: [],
});

const User = mongoose.model("User", userSchema);
export default User;
