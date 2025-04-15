const jwt = require("jsonwebtoken");

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify the token
        const payload = verifyToken(token, "JWT_SECRET");

        req.user = payload;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again.",
            });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = authenticate;
