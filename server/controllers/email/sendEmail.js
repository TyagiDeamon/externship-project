import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.USER,
		pass: process.env.PASSWORD,
	},
	tls: {
		rejectUnauthorized: false,
	},
	ignoreTLS: true,
	secure: false,
	port: 587,
});

const sendEmail = async (req, res) => {
	try {
		let message = {
			from: process.env.SENDER,
			to: req.body.email,
			subject: req.body.subject,
			text: req.body.text,
		};

		await transporter.sendMail(message);

		res.status(200).json({ success: true, message: "Email sent successfully" });
	} catch (err) {
		res.status(500).json({ message: "Email not sent" });
	}
};

export default sendEmail;
