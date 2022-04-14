import express from "express";
import Brand from "../models/subModel";

const router = express.Router();

router.post("/", async (req, res) => {
  let brand = new Brand({
    category: req.body.category,
    name: req.body.name,
  });
  try {
    let newbrand = await brand.save();
    res.status(201).json({
      message: "Brand has been created successfully",
      newbrand,
    });
  } catch (error) {
    res.json(error);
    console.log("Error ====>", error);
  }
});

router.get("/", async (req, res) => {
  try {
    let brands = await Brand.find();
    if (!brands) {
      res.json({
        message: "There are no brands in the database at this time",
      });
    }
    res.status(200).json(brands);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let brand = await Brand.findById(req.params.id);
    res.status(200).json(brand);
  } catch (error) {
    res.json(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  const brandUpdate = {
    category: req.body.category,
    name: req.body.name,
  };
  try {
    const updated = await Brand.findByIdAndUpdate(
      { _id: req.params.id },
      brandUpdate,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (brand) {
      return res.json({ message: "Brand deleted successfully" });
    } else {
      return res.json({ message: "Brand with that ID does not exist" });
    }
  } catch (err) {
    return res.json({ message: err.message });
  }
});

export default router;
