import express from 'express'
const router = express.Router()

import {
    createAccessory,
    getAccessories,
    updateAccessory,
    removeAccessory,
    getAccessory,
} from "../controllers/accessoryController";

router.post("/", createAccessory);
router.get("/", getAccessories);
router.get("/:id", getAccessory);
router.put("/:id", updateAccessory);
router.delete('/:slug', removeAccessory);


export default router