import express from "express";
import { isLoggedIn } from "../scripts/middlewares/auth.middleware.js";
import { createSupportRequest } from "../controllers/support.controller.js";

const router = express.Router();

router.post('/support-request', isLoggedIn, createSupportRequest);

export default router;