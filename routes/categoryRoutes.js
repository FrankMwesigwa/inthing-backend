import express from 'express'
const router = express.Router()

import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    removeCategory,
    getSubs
} from "../controllers/categoryController";

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:slug", getCategory);
router.put("/:slug", updateCategory);
router.delete('/:slug', removeCategory);
router.get("/subs/:_id", getSubs);


export default router