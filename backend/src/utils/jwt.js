require("dotenv").config();
const jwt = require("jsonwebtoken");

class JWTService {
    static generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_AUTH, { expiresIn: "1h" });
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.JWT_AUTH);
    }
}

module.exports = JWTService;
