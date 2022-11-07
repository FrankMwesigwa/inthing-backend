import express from "express";
import User from "../models/customerModel.js";
import WishList from "../models/wishListModel.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({ _id: req.user.id });

  const wishlist = new WishList({
    title: req.body.title,
    phonenumber: req.body.phonenumber,
    user: user.id,
    price: req.body.price,
    images: req.body.images,
  });
  try {
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  console.log("LoogedIn user ====>", user);
  try {
    const wishlist = await WishList.find({ user: user.id });

    res.json(wishlist);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const stud = await WishList.findOne({ id: id });
    res.status(200).json(stud);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const stud = await WishList.findOne({ id: id });
    res.status(200).json(stud);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", (req, res, next) => {
  WishList.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

export default router;
