import express from "express";
import Banner from "../models/bannerModels.js";

const router = express.Router();

router.post("/", async (req, res) => {
  let banner = new Banner({
    bannername: req.body.bannername,
    description: req.body.description,
    images: req.body.images,
  });
  try {
    let newBanner = await banner.save();
    res.status(201).json({
      message: "Banner has been created successfully",
      newBanner,
    });
  } catch (error) {
    res.json(error);
    console.log("Error ====>", error);
  }
});

router.get("/", async (req, res) => {
  try {
    let banner = await Banner.find();
    if (!banner) {
      res.json({
        message: "There are no banner in the database at this time",
      });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let banner = await Banner.findById(req.params.id);
    res.status(200).json(banner);
  } catch (error) {
    res.json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const bannerUpdate = {
    bannername: req.body.bannername,
    description: req.body.description,
    images: req.body.images,
  };
  try {
    const updated = await Banner.findByIdAndUpdate(
      { _id: req.params.id },
      bannerUpdate,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const imageUpdate = {
    images: req.body.images,
  };
  try {
    const updated = await Banner.findByIdAndUpdate(
      { _id: req.params.id },
      imageUpdate,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
