import Admin from "../models/adminModel";
import generateToken from "../utils/generateToken.js";

export const registerAdmin = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  const userExists = await Admin.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await Admin.create({
    firstName,
    lastName,
    username,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const staff = await Admin.findOne({ username });

  if (staff && (await staff.matchPassword(password))) {
    res.json({
      _id: staff._id,
      username: staff.username,
      role: staff.role,
      token: generateToken(staff._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

export const getStaffById = async (req, res) => {
  const user = await Admin.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export const getAllStaff = async (req, res) => {
  const admin = await Admin.find({}).sort({ createdAt: "desc" });

  if (admin) {
    res.json(admin);
  } else {
    res.status(404);
    throw new Error("No Admin Users Yet !!!");
  }
};

export const deleteStaff = async (req, res) => {
  const user = await Admin.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export const updateStaff = async (req, res) => {
  const user = await Admin.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
