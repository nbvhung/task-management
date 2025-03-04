import { Router } from "express";
const route: Router = Router();

import * as controller from "../controllers/user.controller";

import * as authMiddleware from "../middlewares/auth.middleware";

route.post("/register", controller.register);

route.post("/login", controller.login);

route.get("/detail", authMiddleware.requireAuth, controller.detail);

export const userRoutes: Router = route;
