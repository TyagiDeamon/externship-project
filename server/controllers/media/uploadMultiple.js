import cloudinary from "../../utils/cloudinary.js";

const uploadMultiple = async (req, res) => {
	try {
		let result = [];
		for (const item of req.body) {
			const uploadResult = await cloudinary.uploader.upload(item.path);

			result.push({
				url: uploadResult.secure_url,
				cloudinary_id: uploadResult.public_id,
			});
		}

		res.status(200).json(result);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

export default uploadMultiple;
