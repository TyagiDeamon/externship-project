import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	avatar: String,
	cloudinary_id: String,
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
	sentRequests: [],
	recievedRequests: [],
	friends: [],
	blocked: [],
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
	posts: [],
	type: {
		type: String,
		default: "public",
	},
});

const User = mongoose.model("User", userSchema);
export default User;
