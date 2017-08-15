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
app.get("/",router.showIndex);
app.get("/index",router.showIndex);
app.get("/login",router.showLogin);
app.get("/onlogin",router.showOnLogin);
app.get("/regist",router.showRegist);
app.get("/write",router.showWrite);
app.get("/dailys",router.showDailys);
app.get("/edit",router.showEdit);
app.get("/alldailys",router.showAll);

//业务
app.post("/dologin",router.doLogin);
app.post("/doregist",router.doRegist);
app.post("/doedit",router.doEdit);
app.post("/dodailys",router.doDailys);
app.post("/doalldailys",router.doAllDailys);

app.listen(3000);
