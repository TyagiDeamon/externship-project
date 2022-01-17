import cloudinary from "../../utils/cloudinary.js";

const uploadMedia = async (req, res) => {
	try {
		const uploadResult = await cloudinary.uploader.upload(req.body.path);

		res.status(200).json(uploadResult);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default uploadMedia;
