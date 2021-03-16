const express = require("express");
const router = express.Router();

const { uploadImages, removeImages } = require("../controllers/cloudinaryController");

router.post("/", uploadImages);
router.post("/remove", removeImages);

module.exports = router;