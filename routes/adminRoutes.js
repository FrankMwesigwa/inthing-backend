const express = require("express");

const {
  registerAdmin,
  loginAdmin,
  getStaffById,
  getAllStaff,
  deleteStaff,
  updateStaff,
} = require("./adminController.js");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.delete("/:id", deleteStaff);
router.put("/:id", updateStaff);
router.put("/:id", getStaffById);
router.get("/", getAllStaff);

module.exports = router;
