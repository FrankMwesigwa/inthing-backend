import User from "../models/customerModel";

export const newCustomer = async (req, res) => {
  const { fname, lname, email, phonenumber } = req.body;

  // const customerExists = await User.findOne({ phonenumber });

  // if (customerExists) {
  //   res.status(400);
  //   throw new Error("User with that Phone Number already exists");
  // }

  const customer = await User.create({
    fname,
    lname,
    email,
    phonenumber,
  });

  if (customer) {
    res.status(201).json({
      _id: customer._id,
      fname: customer.fname,
      lname: customer.lname,
      email: customer.email,
      phonenumber: customer.phonenumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid customer data");
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
