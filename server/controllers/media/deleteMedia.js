import cloudinary from "../../utils/cloudinary.js";

const deleteMedia = async (req, res) => {
	try {
		await cloudinary.uploader.destroy(req.params.id);

		res.status(200).json({ message: "File deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default deleteMedia;
