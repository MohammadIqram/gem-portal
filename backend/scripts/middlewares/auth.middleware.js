import { clearCookie, decodeToken } from "../helpers/token.helper.js";

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        console.log('this is a token: (jobflix-auth)', token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "you are not authorized. Please login",
            });
        }
        const decoded = await decodeToken(token);
        if (!decoded.success || !decoded.data) {
            clearCookie(res);
            return res.status(401).json({
                success: false,
                message: "you don't have a valid session. Please log back in"
            });
        }
        req.user = decoded?.data?.payload;
        next();
    } catch (error) {
        return res.status(500).json({
            success: "session expired. Try log back in",
        });
    }
}