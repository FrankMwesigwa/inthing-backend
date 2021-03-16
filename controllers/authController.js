import User from "../models/userModel";

export const createOrUpdateUser = async (req, res) => {
  const { phonenumber} = req.body;

  const user = await User.findOneAndUpdate({phonenumber},{ new: true });
  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({phonenumber}).save();
    res.json(newUser);
  }
  };

  export const getLoggedInUser = async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        phonenumber: user.phonenumber,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }