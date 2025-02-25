const express = require("express");
const route = express.Router();

const controller = require("../controllers/user.controller");

const validate = require("../../../validates/user.validate");

const authMiddleware = require("../middlewares/auth.middleware");

route.post("/register", validate.register, controller.register);

route.post("/login", validate.login, controller.login);

route.post("/password/forgot", controller.forgotPassword);

route.post("/password/otp", controller.otpPassword);

route.post("/password/reset", controller.resetPassword);

route.get("/detail", authMiddleware.requireAuth, controller.detail);

module.exports = route;