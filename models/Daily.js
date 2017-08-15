var mongoose = require('mongoose');

//schema
var DailySchema = new mongoose.Schema({
    "user_id"  : String,
    "time"  : String,
    "inner" : String,
    "department" : String,
    "name" : String,
    "students" : String
});

//model
var Dailys = mongoose.model("Dailys",DailySchema);

module.exports = Dailys;