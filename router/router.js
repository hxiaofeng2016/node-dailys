var Student = require("../models/Student.js");
var Daily = require("../models/Daily.js");
var md5 = require("../models/md5.js");
var formidable = require("formidable");
//每天凌晨刷新日报flag
var date = new Date();
var oldDate = date;
var idInt = setInterval(function(){
    var date = new Date();
    var newDate = date;
    if(newDate>oldDate){
        oldDate = newDate;
        exports.setFlag();
    }
},60000);//每分钟检索一次


//显示路由 ↓
//显示首页
exports.showIndex = function(req,res,next){
    if (req.session.login != "1") {
        return res.redirect('/login');
    }
    var user = req.session.user;
    Student.findOne({"user": user}, function (err, result) {
        Daily.find({"students":user},function(err,result2){
            res.render("index", {
                "students": result,
                "dailys" : result2
            });
        });
    });
};
//显示登录页
exports.showLogin = function(req,res,next){
    res.render("login");
};

//退出账户
exports.showOnLogin = function(req,res,next){
    req.session.login = "0";
    req.session.user = "";
    return res.redirect('/login');
};


//显示注册页
exports.showRegist = function(req,res,next){
    res.render("regist");
};

//显示写日报页
exports.showWrite = function(req,res,next){
    if (req.session.login != "1") {
        return res.redirect('/login');
    }
    var user = req.session.user;
    Student.findOne({"user": user}, function (err, result) {
        res.render("write", {
            "students": result
        });
    });
};
//显示日报列表页
exports.showDailys = function(req,res,next){
    if (req.session.login != "1") {
        return res.redirect('/login');
    }
    var user = req.session.user;
    Student.findOne({"user": user}, function (err, result) {
        Daily.find({"students":user},function(err,result2){
            res.render("dailys", {
                "students": result,
                "dailys" : result2
            });
        });
    });
};

//显示所有组员日报
exports.showAll = function(req,res,next){
    if (req.session.login != "1") {
        return res.redirect('/login');
    }
    var user = req.session.user;
    Student.findOne({"user": user}, function (err, result) {
        if(result.power > 1){
            Daily.find({"department":result.department},function(err,result2){
                res.render("alldailys", {
                    "students": result,
                    "dailys" : result2
                });
            });
        }else{
            return res.redirect('/index');
        }

    });
};
//显示修改资料页
exports.showEdit = function(req,res,next){
    if (req.session.login != "1") {
        return res.redirect('/login');
    }
    var user = req.session.user;
    Student.findOne({"user": user}, function (err, result) {
        if(err || !result){
            res.send("错误");
            return;
        }
        res.render("edit", {
            "students": result
        });
    });
};



//业务路由 ↓

//登录业务
exports.doLogin = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var user = fields.user;
        var password = fields.password;
        var pwd = md5(md5(password) + "daily");
        Student.findOne({"user": user}, function (err, result) {
            if(err || !result){
                return res.send("-1"); //用户名不存在
            }
            if (pwd == result.password) {
                req.session.login = "1";
                req.session.user = user;
                return res.send("1");  //登陆成功
            } else {
                return res.send("-2");  //密码错误
            }
        });
    });
};

//注册业务
exports.doRegist = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var user = fields.user;
        Student.findOne({"user": user}, function (err, result) {
            if (err) {
                return res.send("-3"); //服务器错误
            }
            if (result) {
                return res.send("-1"); //被占用
            }
            var password = md5(md5(fields.password) + "daily");
            Student.create({
                "user" : user,
                "password" : password,
                "name" : fields.name,
                "sex" : fields.sex,
                "power" : 1,
                "flag" : 0,
                "department" : fields.department
            },function(err, result){
                if (err) {
                    return res.send("-3"); //服务器错误
                }
                req.session.login = "1";
                req.session.user = user;
                return res.send("1"); //注册成功，写入session

            })
        });
    });
};


//添加日报
exports.doDailys = function(req,res,next){
    var user = req.session.user;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        Student.findOne({"user": user}, function (err, result) {
            var json = {
                "user_id" : result._id,
                "time" : fields.time,
                "inner" : fields.inner,
                "students" :result.user,
                "name" :result.name,
                "department" :result.department
            };
            if(result.flag == 0){
                Student.update({"user": user}, {"flag":1}, function(err, result2){
                    Daily.create(json,function(err, result){
                        if (err) {
                            return res.send("-3"); //服务器错误
                        }
                        return res.send("1"); //添加成功
                    });
                });
            }else{
                Daily.update({"user_id": json.user_id,"time": json.time},{"inner":json.inner},{multi: true},function(err, result2){
                    if (err) {
                        return res.send("-3"); //服务器错误
                    }
                    res.send("2"); //修改成功
                    return false;
                });
            }
        });
    });
}

//设置日报状态
exports.setFlag = function(req,res,next){
    Student.update({},{"flag":0}, { multi: true },function(err, result){
        if (err) {
            return err; //服务器错误
        }
    });
}

//修改资料业务
exports.doEdit = function(req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var user = fields.user;
        var password = fields.password;
        var pwd = md5(md5(password) + "daily");

        Student.findOne({"user": user}, function (err, result) {
            if (pwd == result.password) {
                var updates = fields;
                var department = result.department
                password = fields.newpwd;
                pwd = md5(md5(password) + "daily");
                updates.password = pwd;
                Student.update({"user":user},updates,function(err, result){
                    Daily.update({"students": user},{"department":department},function(err, result){
                        if (err) {
                            return res.send("-3"); //服务器错误
                        }
                    });
                    return res.send("1");
                });
            } else {
                return res.send("-2");  //密码错误
            }
        });
    });
};

//显示全部分类日报
exports.doAllDailys = function(req,res,next){
    var user = req.session.user;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        Student.findOne({"user": user}, function (err, result) {
            if(fields.time == "all"){
                Daily.find({},function(err,result2){
                    return res.send(result2);  //密码错误
                });
            }else{
                Daily.find({"time":fields.time},function(err,result2){
                    return res.send(result2);  //密码错误
                });
            }
        });
    });
}