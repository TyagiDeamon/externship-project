import Post from "../../models/Post.js";
import User from "../../models/User.js";

const createPrivatePost = async (req, res) => {
	try {
		const existingUser = await User.findById({_id: req.params.user_id});

		if (!existingUser) {
			return res
				.status(404)
				.json({ message: "You are not authorized to create posts." });
		}

		const newPost = new Post({
			title: req.body.title,
			description: req.body.description,
			author_id: existingUser._id,
			author_name: existingUser.name,
    });
    
    await existingUser.posts.push(newPost);
    await existingUser.save();
    
    res.status(200).json(newPost);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default createPrivatePost;
