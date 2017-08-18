var express = require("express");
var app = express();
var router = require("./router/router.js");
var db = require("./models/db.js");
var session = require('express-session');

//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//模板引擎
app.set("view engine","ejs");
//静态页面
app.use(express.static("./public"));

//显示
app.get("/",router.showIndex);//显示首页
app.get("/index",router.showIndex); //显示首页
app.get("/login",router.showLogin); //显示登录页面
app.get("/onlogin",router.showOnLogin); // 退出账号业务
app.get("/regist",router.showRegist); // 显示注册页面
app.get("/write",router.showWrite); //显示 写日报 页面
app.get("/dailys",router.showDailys); //显示用户个人日报记录
app.get("/edit",router.showEdit); //显示编辑个人资料
app.get("/alldailys",router.showAll); //显示当天组员日报
app.get("/userdailys",router.userDailys); // 生成日报页面

//业务
app.post("/dologin",router.doLogin); //执行登录业务
app.post("/doregist",router.doRegist);//执行注册业务
app.post("/doedit",router.doEdit);//执行修改资料业务
app.post("/dodailys",router.doDailys);//执行写日报业务
app.post("/doalldailys",router.doAllDailys);//执行检索全部日报业务

app.listen(8081);
