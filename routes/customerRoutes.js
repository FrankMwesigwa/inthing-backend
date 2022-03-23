const express = require("express");
const {
  newCustomer,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customerController");
const router = express.Router();

router.post("/register", newCustomer);
router.delete("/:id", deleteCustomer);
router.put("/:id", updateCustomer);
router.put("/:id", getCustomerById);

module.exports = router;
