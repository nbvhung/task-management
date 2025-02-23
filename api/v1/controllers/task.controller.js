const Task = require("../models/task.model");

const paginationHelpers = require("../../../helpers/pagination");
const searchHelpers = require("../../../helpers/search");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    if(req.query.status){
        find.status = req.query.status;
    }


    // Search
    let objectSearch = searchHelpers(req.query);

    if(req.query.keyword){
        find.title = objectSearch.regex;
    }
    // End Search


    // Pagination
    const countTasks = await Task.countDocuments(find);

    let objectPagination = paginationHelpers(
        { 
            currentPage: 1,
            limitItems: 2
        },
        req.query,
        countTasks
    );
    // End Pagination

    
    // Sort
    const sort = {};

    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }

    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)

    res.json(tasks);
}

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;

        const task = await Task.findOne({
            _id: id,
            deleted: false
        });

        res.json(task);
    } catch (error) {
        console.log("Not Found!");
    }
}

// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        await Task.updateOne({
                _id: id,
            },
            {
                status: status
            }
        );

        res.json({
            code: 200, // cập nhật thành công
            message: "Cập nhật trạng thái thành công!"
        });
    } catch (error) {
        res.json({
            code: 400, 
            message: "Không tồn tại!"
        });
    }
}


// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body;

        await Task.updateMany(
            {
                _id: { $in: ids }
            },
            {
                status: value
            }
        )

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


// [POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {
    try {
        const task = new Task(req.body);
        const data = await task.save();

        res.json({
            code: 200,
            message: "Tạo thành công!",
            data: data
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        });
    }
}