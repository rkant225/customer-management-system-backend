const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {type : String, required : true},
    mobileNo : {type : String, required : true},
    password : {type : String, required : true},
});

module.exports = mongoose.model('User', userSchema); // "User" will be the name of tabel