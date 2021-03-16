import express from 'express'
const router = express.Router()
const { authCheck, adminCheck } = require("../middleware/authMiddleware");
const { createSub, readSub, updateSub, removeSub, listSub } = require("../controllers/subController");

router.post("/", createSub);
router.get("/", listSub);
router.get("/:slug", readSub);
router.put("/:slug", updateSub);
router.delete("/:slug", removeSub);

export default router;