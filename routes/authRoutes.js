import express from 'express'
const router = express.Router()

import { createOrUpdateUser, getLoggedInUser } from "../controllers/authController";

router.post("/", createOrUpdateUser);
router.get("/", getLoggedInUser)

export default router