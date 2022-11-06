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
  productSearch,
  removeImage
} from '../controllers/productController.js'

router.get("/search/:key", productSearch);
router.get("/:slug", getProductsByBrand);
router.get("/prod/:id", getProduct);
router.delete("/:slug", deleteProduct);
router.put("/update/:id", updateProduct);
router.put("/remove/:id", removeImage);
router.get("/related/:productId", listRelated);
router.post("/search/filters", searchFilters);
router.post("/", createProduct);
router.get("/", getAllProducts);  

export default router
