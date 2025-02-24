const express = require("express");
const route = express.Router();

const validate = require("../../../validates/user.validate");

const controller = require("../controllers/user.controller");

route.post("/register", validate.register, controller.register);

route.post("/login", validate.login, controller.login);

module.exports = route;