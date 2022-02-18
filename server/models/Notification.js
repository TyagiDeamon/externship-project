import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
	{
		sender: {
			type: String,
			required: true,
		},
		reciever: {
			type: String,
			required: true,
		},
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
		content: {
			type: String,
			required: true,
			maxlength: 512,
			trim: true,
		},
		read: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			required: true,
			enum: ["like", "comment", "reply", "request", "accept", "share"],
		},
	},
	{ timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
