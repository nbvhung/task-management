const express = require("express");
const route = express.Router();

const validate = require("../../../validates/user.validate");

const controller = require("../controllers/user.controller");

route.post("/register", validate.register, controller.register);

route.post("/login", validate.login, controller.login);

route.post("/password/forgot", controller.forgotPassword);

route.post("/password/otp", controller.otpPassword);

route.post("/password/reset", controller.resetPassword);

route.get("/detail", controller.detail);

module.exports = route;