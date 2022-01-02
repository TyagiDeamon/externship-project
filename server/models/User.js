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
	emailVerified: {
		type: Boolean,
		default: false,
	},
	tempToken: {
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
	posts: [],
});

const User = mongoose.model("User", userSchema);
export default User;
