import multer from "multer";
import path from "path";

export default multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, next) => {
		let ext = path.extname(file.originalname);

		if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
			next(
				new Error("File type not supported. Please use .jpg, .jpeg, or .png"),
				false
			);
			return;
		}

		next(null, true);
	},
});
