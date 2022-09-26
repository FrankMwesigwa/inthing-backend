import express from "express";
import Seller from "../models/sellersModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  let seller = new Seller({
    fullnames: req.body.fullnames,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    buisness: req.body.business,
    location: req.body.location,
    items: req.body.items,
  });
  try {
    let newSeller = await seller.save();
    res.status(201).json({
      message: "Seller has been created successfully",
      newSeller,
    });
  } catch (error) {
    res.json(error);
    console.log("Error ====>", error);
  }
});

router.get("/", async (req, res) => {
  try {
    let seller = await Seller.find();
    if (!seller) {
      res.json({
        message: "There are no seller in the database at this time",
      });
    }
    res.status(200).json(seller);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let seller = await Seller.findById(req.params.id);
    res.status(200).json(seller);
  } catch (error) {
    res.json(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  const sellerUpdate = {
    fullnames: req.body.fullnames,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    buisness: req.body.business,
    location: req.body.location,
    items: req.body.items,
  };
  try {
    const updated = await Seller.findByIdAndUpdate(
      { _id: req.params.id },
      sellerUpdate,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (seller) {
      return res.json({ message: "Seller deleted successfully" });
    } else {
      return res.json({ message: "Seller with that ID does not exist" });
    }
  } catch (err) {
    return res.json({ message: err.message });
  }
});

export default router;
