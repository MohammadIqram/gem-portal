import jwt from "jsonwebtoken";

export const generateToken = async (payload, expiry) => {
    return await jwt.sign({payload}, process.env.TOKEN_SECRET, {
        expiresIn: expiry
    });
}

export const decodeToken = async (token) => {
    const result = {
        success: false,
        msg: '',
        data: null,
    };

    try {
        const data = await jwt.decode(token); // decode is synchronous
        result.success = true;
        result.data = data;
    } catch (error) {
        result.msg = error.message;
    }

    return result;
};

// cookie helper
export const authCookie = (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // prevents XSS
        secure: process.env.NODE_ENV === "production", // only HTTPS in production
        sameSite: process.env.SAME_SITE, // needed for cross-site cookies
        domain: process.env.DOMAIN, // make cookie accessible to all subdomains
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });
};

export const clearCookie = (res) => {
    res.clearCookie("accessToken", {
        httpOnly: true, // prevents XSS
        secure: process.env.NODE_ENV === "production", // only HTTPS in production
        sameSite: process.env.SAME_SITE, // needed for cross-site cookies
        domain: process.env.DOMAIN, // make cookie accessible to all subdomains
    });
};

export const validateCloudflareCaptcha = async(token, ip) => {
    const result = {
        valid: false,
        error: 'invalid session',
    };
    if (!token) {
        return result;
    }

    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET_KEY,
                response: token,
                remoteip: ip
            }),
        })
        const data = await response.json();
        if (!data.success) {
            result.error = `Bot detected / ${data["error-codes"]}`;
        }
        result.valid = true;
        return result;
    } catch (error) {
        console.log('this is a error', error);
        result.error = error.message;
        return result;
    }
}