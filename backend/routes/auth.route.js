import express from "express";
import { signup, login, logout, forgotPassword, forgotPasswordConfirm } from "../controllers/login.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/forgot-password/confirm", forgotPasswordConfirm);

export default router;