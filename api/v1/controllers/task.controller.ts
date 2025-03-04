import { Request, Response } from "express";

import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";

export const index = async (req: Request, res: Response) => {

    // Find
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    };

    const find: Find = {
        deleted: false,
    }

    if (req.query.status) {
        find.status = req.query.status.toLocaleString();
    }
    // End Find


    // Search
    let objectSearch = searchHelper(req.query);

    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    // End Search


    // Pagination
    let initPagination = {
        currentPage: 1,
        limitItems: 2
    }

    const countTasks = await Task.countDocuments(find);
    let objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTasks
    );
    // End Pagination


    // Sort
    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toLocaleString(); // ép kiểu sang string
        sort[sortKey] = req.query.sortValue;
    }
    // End Sort

    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.json(tasks);
};


export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const task = await Task.findOne({
        _id: id,
        deleted: false
    });

    res.json(task);
}


export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const status: string = req.body.status;

        await Task.updateOne({ _id: id }, {
            status: status
        });

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        });
    }
}


export const changeMulti = async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;
        const key: string = req.body.key;
        const value: string = req.body.value;

        switch (key) {
            case "status":
                await Task.updateMany({
                    id: { $in: ids }
                },
                    {
                        status: value
                    }
                );

                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công!"
                });
                break;

            default:
                res.json({
                    code: 400,
                    message: "Thất bại!"
                });
                break;
        }

    } catch (error) {
        res.json({
            code: 400,
            message: "Thất bại!"
        })
    }
}