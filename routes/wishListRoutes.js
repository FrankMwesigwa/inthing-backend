import express from "express";
import WishList from "../models/wishListModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const wishlist = new WishList({
    title: req.body.title,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
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

router.get("/", async (req, res) => {
  try {
    const wishlist = await WishList.find();

    res.json(wishlist);
  } catch (error) {
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
