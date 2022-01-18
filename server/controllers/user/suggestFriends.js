import User from "../../models/User.js";

const suggestFriends = async (req, res) => {
	try {
		const user = await User.findById(req.body.id).populate({
			path: "friends",
			model: User,
			select: "friends",
		});

		if (!user) {
			throw { status: 404, message: "Please signup or login to continue" };
		}

		let suggested = new Set();

		user.friends.map((friend) => {
			friend.friends.map((item) => {
				if (item.toString() !== user._id && !suggested.has(item.toString()))
					suggested.add(item.toString());
			});
		});

		let searchQuery = {};
		let placeRegex = null;
		let place = user.place;

		if (place) placeRegex = new RegExp(place, "i");

		if (place) {
			searchQuery.place = placeRegex;
		}

		if (Object.keys(searchQuery).length != 0) {
			const searchResults = await User.find(searchQuery).limit(20);

			searchResults?.map(({ _id }) => {
				if (_id.toString() !== user._id && !suggested.has(_id.toString()))
					suggested.add(_id.toString());
			});
		}

		let data = [];
		suggested.forEach((id) => data.push(id));

		res.status(200).json({
			data,
		});
	} catch (error) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Something Went Wrong..." });
	}
};

export default suggestFriends;
