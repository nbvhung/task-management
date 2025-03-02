import { Router, Request, Response } from "express";
const route: Router = Router();

import Task from "../../models/task.model";


route.get("/", async (req: Request, res: Response) => {
    const tasks = await Task.find({
        deleted: false
    });

    res.json(tasks);
});

route.get("/detail/:id",  async (req: Request, res: Response) => {
    const id: string = req.params.id;
    
    const task = await Task.findOne({
        _id: id,
        deleted: false
    });

    res.json(task);
});

export const taskRoutes: Router = route;
