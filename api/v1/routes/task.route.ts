import { Router } from "express";
const route: Router = Router();

import * as controller from "../controllers/task.controller";

route.get("/", controller.index);

route.get("/detail/:id", controller.detail);

route.patch("/change-status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

export const taskRoutes: Router = route;
