import express from "express";
import { profile, getAccount, updateAccountBasic, updateAccountPassword, updateAccountPhoneNumber } from "../controllers/account.controller.js";
import { isLoggedIn } from "../scripts/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", isLoggedIn, profile);
router.get('/profile/me', isLoggedIn, getAccount);
router.put('/profile/me/basic', isLoggedIn, updateAccountBasic);
router.put('/profile/me/change-password', isLoggedIn, updateAccountPassword);
router.put('/profile/me/phone', isLoggedIn, updateAccountPhoneNumber);

export default router;