import User from "../../models/User.js";

const getUsers = async (req, res) => {
	try {
		let { username, email, page } = req.query;
		if (!page) page = 1;

		const LIMIT = 100;
		const startIndex = (Number(page) - 1) * LIMIT;
		let searchQuery = {};
		let usernameRegex = null;
		let emailRegex = null;

		if (username) usernameRegex = new RegExp(username, "i");
		if (email) emailRegex = new RegExp(email, "i");

		if (username && email) {
			searchQuery.$or = [{ username: usernameRegex }, { email: emailRegex }];
		} else if (username) {
			searchQuery.username = usernameRegex;
		} else if (email) {
			searchQuery.email = emailRegex;
		}

		totalUsers = await User.countDocuments(searchQuery);
		let users = null;

		if (Object.keys(searchQuery).length == 0)
			users = await User.find()
				.sort({ username: 1 })
				.limit(LIMIT)
				.skip(startIndex);
		else users = await User.find(searchQuery).limit(LIMIT).skip(startIndex);

		users = users.map(({ username, email }) => ({ username, email }));

		res.status(200).json({
			data: users,
			currentPage: Number(page),
			numberOfPages: Math.ceil(totalUsers / LIMIT),
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default getUsers;
