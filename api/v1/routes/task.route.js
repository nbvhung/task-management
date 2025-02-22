const express = require("express");
const route = express.Router();

const controller = require("../controllers/task.controller");

route.get("/", controller.index);

route.get("/detail/:id", controller.detail);

module.exports = route;
