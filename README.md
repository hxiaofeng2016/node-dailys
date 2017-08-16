# Dailys简介

> Dailys系统是 基于Node.js 平台开发的，使用的技术栈 为：
> express + express-session + formidable + mongodb + mongoose
> 功能：组员注册账号，填写日报， 管理员可查看当天/全部组员的日报

安装mongoDB 并运行 （可视化工具 推荐："MongoDB Compass"）

``` JavaScript
mongod --dbpath "xxx"
```

安装相关模块node_modules

``` JavaScript
 npm install
```

 修改数据库连接 文件路径：

``` JavaScript
 models/db.js
```

 运行项目

``` JavaScript
 node app.js
```
