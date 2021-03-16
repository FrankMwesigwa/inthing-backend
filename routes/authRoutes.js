import express from 'express'
const router = express.Router()

import { createOrUpdateUser, getLoggedInUser } from "../controllers/authController";
import { authCheck } from '../middleware/authMiddleware';

router.post("/", createOrUpdateUser);
router.get("/", authCheck, getLoggedInUser)

export default router