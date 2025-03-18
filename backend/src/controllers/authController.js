const httpStatus = require("http-status");
const { UserModel } = require("../models");
const { ApiError } = require("../utils/ApiError");
const JWTService = require("../utils/jwt");
const redis = require("../utils/redisClient"); // Import Redis client

class AuthController {
    static async registerUser(req, res, next) {
        try {
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                console.log("Registration Error: Missing Fields");
                return next(new ApiError(httpStatus.BAD_REQUEST, "All fields are required"));
            }

            const existingUser = await UserModel.findOne({ email: email.toLowerCase() });

            if (existingUser) {
                console.log("User Already Exists:", email);
                return next(new ApiError(httpStatus.BAD_REQUEST, "User already exists"));
            }

            const newUser = await UserModel.create({ email: email.toLowerCase(), password, name });
            console.log("User Registered Successfully:", newUser.email);

            res.status(httpStatus.CREATED).json({
                message: "User registered successfully",
            });
        } catch (error) {
            console.log("Registration Failed:", error.message);
            next(error);
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                console.log("Login Attempt Failed: Missing Credentials");
                return next(new ApiError(httpStatus.BAD_REQUEST, "Email and password are required"));
            }

            const user = await UserModel.findOne({ email: email.toLowerCase() });

            if (!user) {
                console.log("Login Failed: User Not Found -", email);
                return next(new ApiError(httpStatus.BAD_REQUEST, "User does not exist"));
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                console.log("Login Failed: Incorrect Password -", email);
                return next(new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials"));
            }

            const token = JWTService.generateToken({ userId: user._id });
            console.log("Login Successful: Token Generated for", email);

            // ✅ Fixed Redis `.set()` method syntax
            await redis.set(`userToken:${user._id}`, token, { ex: 3600 }); // Token expires in 1 hour

            res.status(httpStatus.OK).json({
                message: "User logged in successfully",
                token,
            });
        } catch (error) {
            console.log("Login Failed:", error.message);
            next(error);
        }
    }

    
    // ✅ Fetch User Profile
    static async profileUser (req, res){
        try {
            const userId = req.user.id;
            const cacheKey = `user:${userId}`;
    
            // ✅ Fetch user profile from Redis
            const cachedUserProfile = await redis.get(cacheKey);
            if (cachedUserProfile) {
                try {
                    const userProfile = JSON.parse(cachedUserProfile);
                    console.log("Fetched User Profile from Cache:", userProfile);
                    return res.status(200).json({ user: userProfile });
                } catch (error) {
                    console.error("Profile Fetch Failed: Invalid JSON in Cache", error);
                    await redis.del(cacheKey); // Clear invalid cache
                }
            }
    
            // ✅ Fetch from database if not in cache
            const user = await User.findById(userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User Not Found" });
            }
    
            console.log("Fetched User Profile from Database:", user);
    
            // ✅ Ensure JSON format before storing in Redis
            const userProfileString = JSON.stringify(user);
            await redis.set(cacheKey, userProfileString, { EX: 3600 });
    
            res.status(200).json({ user });
        } catch (error) {
            console.error("Error Fetching User Profile:", error);
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    };
    
 
    
}

module.exports = AuthController;
