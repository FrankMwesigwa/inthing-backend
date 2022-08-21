import express from 'express'
const router = express.Router()

import { createOrUpdateUser, getLoggedInUser } from "../controllers/authController";
import { auth } from '../middleware/authMiddleware';

router.post("/", createOrUpdateUser);
router.get("/", auth, getLoggedInUser)

export default router