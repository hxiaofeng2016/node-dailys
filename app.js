var express = require("express");
var app = express();
var router = require("./router/router.js");
var db = require("./models/db.js");
var session = require('express-session');

//ʹ��session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


//ģ������
app.set("view engine","ejs");
//��̬ҳ��
app.use(express.static("./public"));

//��ʾ
app.get("/",router.showIndex);
app.get("/index",router.showIndex);
app.get("/login",router.showLogin);
app.get("/onlogin",router.showOnLogin);
app.get("/regist",router.showRegist);
app.get("/write",router.showWrite);
app.get("/dailys",router.showDailys);
app.get("/edit",router.showEdit);
app.get("/alldailys",router.showAll);

//ҵ��
app.post("/dologin",router.doLogin);
app.post("/doregist",router.doRegist);
app.post("/doedit",router.doEdit);
app.post("/dodailys",router.doDailys);
app.post("/doalldailys",router.doAllDailys);

app.listen(3000);
