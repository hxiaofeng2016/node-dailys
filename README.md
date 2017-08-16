# node-dailys
日报系统 技术栈：(express + express-session + formidable + mongodb + mongoose) 

示例：

  安装mongoDB 并运行 (mongod --dbpath "xxx")
  可视化工具 推荐："MongoDB Compass"
  
  安装相关模块node_modules
  npm install
  
  修改数据库连接
  文件：models/db.js
  
  运行项目
  node app.js
  
  备注：

  用户默认power(权限)为1;

  本地运行后 修改用户的power 大于1 可看到全部人员的日报
