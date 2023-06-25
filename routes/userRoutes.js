const express = require("express");
const { registerUser } = require("../controllers/userController");
const{loginUser} = require("../controllers/userController");
const{CurrentUser} = require("../controllers/userController");
const validateToken = require("../middleware/ValidateTokenHandler");

const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/current",validateToken,CurrentUser);

module.exports = router;

