const express = require("express");
const { signup, signin, getProfile } = require("../controllers/authController.js");
const { authMiddleware } = require("../middleware/auth.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
