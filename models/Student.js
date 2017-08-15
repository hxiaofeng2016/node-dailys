var mongoose = require('mongoose');

//schema
var studentSchema = new mongoose.Schema({
    "user" : String,
    "name" : String,
    "sex" : String,
    "password" : String,
    "department" : String,
    "power" : Number,
    "flag" : Number,
    "dailys" : [Number]
});
//索引
studentSchema.index({ "sid": 1});

//model
var Student = mongoose.model("Student",studentSchema);

module.exports = Student;