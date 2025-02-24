module.exports.register = (req, res, next) => {
    if(!req.body.fullName){
        res.json({
            code: 400,
            message: "Họ tên không được để trống!"
        });
        return;
    }

    if(!req.body.email){
        res.json({
            code: 400,
            message: "Email không được để trống!"
        });
        return;
    }

    if(!req.body.password){
        res.json({
            code: 400,
            message: "Mật khẩu không được để trống!"
        });
        return;
    }

    next();
}


module.exports.login = (req, res, next) => {
    if(!req.body.email){
        res.json({
            code: 400,
            message: "Email không được để trống!"
        });
        return;
    }

    if(!req.body.password){
        res.json({
            code: 400,
            message: "Mật khẩu không được để trống!"
        });
        return;
    }

    next();
}