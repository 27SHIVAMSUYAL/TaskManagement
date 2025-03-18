const express = require("express");
const AuthController = require("../controllers/authController");
const AuthValidator = require("../middlewares/authValidator");

const router = express.Router();

router.post("/register", AuthController.registerUser);  
router.post("/login", AuthController.loginUser);  
router.get("/profile", AuthValidator, AuthController.profileUser);  

module.exports = router;
