import User from "../../models/User.js";

const getBlocked = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select("blocked");

    if (!user) {
      throw { status: 404, message: "Please signup or login to continue" };
    }

    res.status(200).send(user.blocked);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Something went wrong" });
  }
};

export default getBlocked;