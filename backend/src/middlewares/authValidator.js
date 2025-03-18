require("dotenv").config();
const jwt = require("jsonwebtoken");

const authValidator = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token || !token.startsWith("Bearer ")) {
            console.log("❌ Unauthorized Access Attempt: No Token Provided");
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_AUTH);
        console.log("✅ JWT Decoded Successfully:", decoded);

        req.user = { id: decoded.userId };  // ✅ Ensure `req.user.id` exists
        next();
    } catch (error) {
        console.log("❌ Invalid Token Error:", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authValidator;
