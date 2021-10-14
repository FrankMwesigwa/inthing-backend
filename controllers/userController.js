import User from "../models/userModel";
import generateToken from "../utils/generateToken.js";

export const registerAdmin = async (req, res) => {
  const { fname, lname, email, password, role, phone } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User with that email already exists");
  }

  const user = await User.create({
    fname,
    lname,
    email,
    role,
    phone,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const staff = await User.findOne({ username });

  if (staff && (await staff.matchPassword(password))) {
    res.json({
      _id: staff._id,
      email: staff.email,
      role: staff.role,
      fname: staff.fname,
      lname: staff.lname,
      token: generateToken(staff._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

export const getStaffById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

export const getAllStaff = async (req, res) => {
  const pageSize=20
  const page = parseInt(req.query.page || 1)
  const total = await User.countDocuments({})

  const staff = await User.find({})
  .sort({createdAt:'desc'})
  .limit(pageSize)
  .skip(pageSize * page)
  
  if (staff) {
    res.json({staff, total, totalPages: Math.ceil(total/pageSize)});
  } else {
    res.status(404);
    throw new Error("Accessories not found");
  }
}

export const deleteStaff = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

export const updateStaff = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}
