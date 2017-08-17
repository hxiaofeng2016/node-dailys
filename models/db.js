var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/daily');
// mongoose.connect('mongodb://test:test@url:60002/test',{useMongoClient: true});//连接远程数据库
var db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

module.exports = db;