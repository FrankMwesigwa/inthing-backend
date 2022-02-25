import express from "express";
import WishList from "../models/wishListModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const wishlist = new WishList({
    title: req.body.title,
    phonenumber: req.body.phonenumber,
    description: req.body.description,
    price: req.body.price,
    size: req.body.size,
    image: req.body.image
  });
  try {
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const wishlist = await WishList.find();

    res.status(200).json(wishlist);
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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const stud = await WishList.findOne({ id: id });
    res.status(200).json(stud);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;