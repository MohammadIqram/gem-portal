import User from "../models/user.model.js";
import EmailHelper from "../scripts/helpers/email.helper.js";
import { authCookie, clearCookie, generateToken, decodeToken, validateCloudflareCaptcha } from "../scripts/helpers/token.helper.js";
import { forgotPasswordTemplate } from "../templates/account.templates.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    try {
        const { email, password, token } = req.body;

        // validate form
        if (!email || !password || !token) {
            return res.status(400).json({
                success: false,
                message: "email, password and captcha token are required.",
            });
        }

        // Validate Cloudflare Captcha
		const captchaResult = await validateCloudflareCaptcha(token, req.ip);
		if (!captchaResult.valid) {
			return res.status(400).json({
				success: false,
				message: captchaResult.error
			});
		}

        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "email or password is incorrect.",
            });
        }

        const isPwdValid = user.comparePassword(password);
        if (!isPwdValid) {
            return res.status(401).json({
                success: false,
                message: "please check your email or password and try agian."
            });
        }

        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        };
        const accessToken = await generateToken(payload, '30d');
        authCookie(res, accessToken);
        res.status(200).json({
            success: true,
            message: "logged in successfully!",
            user: payload,
        });
    } catch (error) {
        console.log('error from the login controller: ', error.message);
        return res.status(500).json({
            success: false,
            message: "some unexpected error occured. Please try again later.",
            code: 500,
        });
    }
}

export const signup = async (req, res) => {
    try {
        const { name, email, phone, password, token } = req.body;

        if (!name || !email || !phone || !password || !token) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate Cloudflare Captcha
		const captchaResult = await validateCloudflareCaptcha(token, req.ip);
		if (!captchaResult.valid) {
			return res.status(400).json({
				success: false,
				message: captchaResult.error
			});
		}

        const existingUser = await User.findOne({ email }).select('_id');
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists. Please use another email. If this email belongs to you try resetting your password." });
        }

        await User.create({ name, email, phone, password });

        res.status(201).json({
            success: true,
            message: "User registered successfully. Please login to continue.",
        });
    } catch (error) {
        console.error('this error is from the signup controller: ', error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message, code: 500 });
    }
}

export const logout = async (req, res) => {
    try {
        clearCookie(res);
        return res.status(200).json({
            success: true,
            message: "user logged out successfully.",
        });
    } catch (error) {
        console.log('error from the logout controller: ', error.message);
        return res.status(500).json({
            success: false,
            message: "some unexpected error occured. Please try again later."
        });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "email is required.",
            });
        }

        const user = await User.findOne({ email }).select('_id');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "no user found with this email. Please check the email and try again.",
            });
        }

        const token = await generateToken({ _id: user._id }, '1h'); // token valid for 1 hour
        const resetLink = `${process.env.CLIENT_URL}/forgot-password/confirm?token=${token}`;
        const html = EmailHelper.renderTemplate(forgotPasswordTemplate, {
            name: user.name,
            resetLink,
            token,
            expiry: '1 hour',
        });

        const emailHelper = new EmailHelper();
        console.log('logger', emailHelper.logger());
        await emailHelper.sendEmail({
            to: email,
            subject: "Password Reset Instructions for Your Jobflix Account",
            html,
            text: `Hi ${email},\n\nWe received a request to reset the password for your Jobflix account. Please click the link below to reset your password:\n\n${resetLink}\n\nThis link will expire in 1 hour.\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nThe Jobflix Team`
        });

        return res.status(200).json({
            success: true,
            message: "password reset instructions have been sent to your email. Please check your inbox. If the email is not in your inbox, please check your spam folder as well.",
        });
    } catch (error) {
        console.log('error from the forgot password controller: ', error.message);
        return res.status(500).json({
            success: false,
            message: "some unexpected error occured. Please try again later.",
        });
    }
}

export const forgotPasswordConfirm = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;

        if (!token || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "token, password and confirm password are required.",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password do not match.",
            });
        }

        let decoded;
        decoded = await decodeToken(token);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(confirmPassword, salt);
            
        await User.updateOne(
            { decoded: decoded._id },
            { $set: { password: hashedPassword } },
        );

        return res.status(200).json({
            success: true,
            message: "password has been reset successfully. Please login with your new password.",
        });
    } catch (error) {
        console.log('error from the forgot password confirm controller: ', error.message);
        return res.status(500).json({
            success: false,
            message: "some unexpected error occured. Please try again later.",
        });
    }
}