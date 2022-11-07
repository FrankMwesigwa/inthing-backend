import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/customerModel";

export const newCustomer = async (req, res) => {
  const { fullnames, email, phonenumber, password, address } = req.body;

  const customerExists = await User.findOne({ email });

  if (customerExists) {
    res.status(400);
    throw new Error("User with that Email Address already exists");
  }

  const customer = await User.create({
    email,
    phonenumber,
    fullnames,
    password: Bcrypt.hashSync(password, 10),
    address
  });

  if (customer) {
    res.status(201).json({
      _id: customer._id,
      fullnames: customer.fullnames,
      email: customer.email,
      address: customer.address,
      password: customer.password,
      phonenumber: customer.phonenumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid customer data");
  }
};

export const customerLogin = async (req, res) => {
  try {
    var user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "The Email is not registered" });
    }
    if (!Bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({ message: "Invalid password " });
    }

    const accessToken = jwt.sign(
      { id: user._id},
      process.env.JWT_SECRET
    );
    res.json({
      accessToken: accessToken,
      user: user,
      message: "Successfully logged in!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getCustomerById = async (req, res) => {
  const customer = await User.findById(req.params.id).select("-password");

  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export const deleteCustomer = async (req, res) => {
  const customer = await User.findById(req.params.id);

  if (customer) {
    await customer.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export const updateCustomer = async (req, res) => {
  const customer = await User.findById(req.params.id);

  if (customer) {
    customer.name = req.body.name || customer.name;
    customer.email = req.body.email || customer.email;

    const updatedUser = await customer.save();

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
