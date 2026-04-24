import express from "express";
import { isLoggedIn } from "../scripts/middlewares/auth.middleware.js";
import { contactUs, createSupportRequest } from "../controllers/support.controller.js";

const router = express.Router();

router.post('/support-request', isLoggedIn, createSupportRequest);
router.post('/general-contact', contactUs)

export default router;