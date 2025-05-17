import jwt from "jsonwebtoken";
// Utility to create access token
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET);
};
// Utility to create refresh token
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET);
};
// Middleware to verify access token and refresh if needed
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accesstoken;
    console.log("Token: ", token);
    if (!token) {
        // If no access token, try to renew using refresh token
        return renewToken(req, res, next);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If token is invalid or expired, try refresh token
            return renewToken(req, res, next);
        }
        req.user = user;
        next(); // All good, move on
    });
};
// Function to renew access token using refresh token
const renewToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshtoken;
    console.log("Refresh Token: ", refreshToken);
    if (!refreshToken) {
        return res
            .status(401)
            .json({ valid: false, message: "No refresh token provided" });
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err || !user) {
            return res
                .status(403)
                .json({ valid: false, message: "Invalid refresh token" });
        }
        // Create new access token
        const newAccessToken = createAccessToken(user);
        // Send new access token in cookie (or send in JSON if you prefer)
        res.cookie("accesstoken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 1000, // 15 minutes
        });
        req.user = user;
        next(); // continue to next route
    });
};
