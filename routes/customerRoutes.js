const express = require("express");
const {
  newCustomer,
  customerLogin,
  getCustomerById,
  deleteCustomer,
  updateCustomer,
} = require("../controllers/customerController");
const router = express.Router();

router.post("/register", newCustomer);
router.post("/login", customerLogin);
router.delete("/:id", deleteCustomer);
router.put("/:id", updateCustomer);
router.put("/:id", getCustomerById);

module.exports = router;
