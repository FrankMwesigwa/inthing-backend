import express from 'express'

const router = express.Router()
import {
  getAllProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductsByBrand,
  listRelated,
  searchFilters,
  searchQuery,
} from '../controllers/productController.js'

const { authCheck, adminCheck } = require("../middleware/authMiddleware");

router.get("/search", searchQuery);
router.get("/:slug", getProductsByBrand);
router.get("/prod/:id", getProduct);
router.delete("/:slug", deleteProduct);
router.put("/:id", updateProduct);
router.get("/related/:productId", listRelated);
router.post("/search/filters", searchFilters);
router.post("/", createProduct);
router.get("/", getAllProducts);  

export default router
