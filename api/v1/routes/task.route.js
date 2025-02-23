const express = require("express");
const route = express.Router();

const controller = require("../controllers/task.controller");

route.get("/", controller.index);

route.get("/detail/:id", controller.detail);

route.patch("/change-status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

module.exports = route;
