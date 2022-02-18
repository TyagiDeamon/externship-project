import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
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
		sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		recievedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
		type: {
			type: String,
			default: "public",
		},
		views: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
export default User;
