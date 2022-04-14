import express from "express";
import Category from "../models/categoryModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Body ====>", req.body);
  let category = new Category({
    category: req.body.category,
    type: req.body.type,
    description: req.body.description,
  });
  try {
    let newCategory = await category.save();
    res.status(201).json({
      message: "Category has been created successfully",
      newCategory,
    });
  } catch (error) {
    res.json(error);
    console.log("Error ====>", error);
  }
});

router.get("/", async (req, res) => {
  try {
    let institutes = await Category.find();
    if (!institutes) {
      res.json({
        message: "There are no institutes in the database at this time",
      });
    }
    res.status(200).json(institutes);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.json(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  const catUpdate = {
    category: req.body.category,
    description: req.body.description,
  };
  try {
    const updated = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      catUpdate,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      return res.json({ message: "Category deleted successfully" });
    } else {
      return res.json({ message: "Category with that ID does not exist" });
    }
  } catch (err) {
    return res.json({ message: err.message });
  }
});

export default router;
