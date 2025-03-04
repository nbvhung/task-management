import { Router } from "express";
const route: Router = Router();

import * as controller from "../controllers/user.controller";

route.post("/register", controller.register);

route.post("/login", controller.login);

route.get("/detail/:id", controller.detail);

export const userRoutes: Router = route;
