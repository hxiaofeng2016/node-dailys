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
app.get("/",router.showIndex);//��ʾ��ҳ
app.get("/index",router.showIndex); //��ʾ��ҳ
app.get("/login",router.showLogin); //��ʾ��¼ҳ��
app.get("/onlogin",router.showOnLogin); // �˳��˺�ҵ��
app.get("/regist",router.showRegist); // ��ʾע��ҳ��
app.get("/write",router.showWrite); //��ʾ д�ձ� ҳ��
app.get("/dailys",router.showDailys); //��ʾ�û������ձ���¼
app.get("/edit",router.showEdit); //��ʾ�༭��������
app.get("/alldailys",router.showAll); //��ʾ������Ա�ձ�
app.get("/userdailys",router.userDailys); // �����ձ�ҳ��

//ҵ��
app.post("/dologin",router.doLogin); //ִ�е�¼ҵ��
app.post("/doregist",router.doRegist);//ִ��ע��ҵ��
app.post("/doedit",router.doEdit);//ִ���޸�����ҵ��
app.post("/dodailys",router.doDailys);//ִ��д�ձ�ҵ��
app.post("/doalldailys",router.doAllDailys);//ִ�м���ȫ���ձ�ҵ��

app.listen(8081);
