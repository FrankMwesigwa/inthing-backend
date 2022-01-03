import Customer from "../models/customerModel";

export const createOrUpdateUser = async (req, res) => {
  const { phonenumber} = req.body;

  const customer = await Customer.findOneAndUpdate({phonenumber},{ new: true });
  if (customer) {
    res.json(customer);
  } else {
    const newUser = await new Customer({phonenumber}).save();
    res.json(newUser);
  }
  };

  export const getLoggedInUser = async (req, res) => {
    const customer = await User.findById(req.customer._id)
  
    if (customer) {
      res.json({
        _id: customer._id,
        phonenumber: customer.phonenumber,
        isAdmin: customer.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }