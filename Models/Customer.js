const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name : {type : String, required : true},
    mobileNo : {type : Number, required : true},
    address : {type : String, required : true},
    item : {type : String, default : 'TABLE_FAN_CINNI_MODEL', enum : [ 'TABLE_FAN_CINNI_MODEL', 'FARRATA_SAGAR_MODEL', 'FARRATA_CENTURY_MODEL', 'FARRATA_5_SWEEP',  'CELLING_FAN', 'COOLER_KIT', 'EXHAUST_HEAVY', 'EXHAUST_SMALL', 'TULLU', 'MOTOR_.5_HP', 'MOTOR_1_HP', 'MOTOR_1.5_HP', 'MOTOR_2_HP', 'SUBMERSIBLE_.5_HP', 'SUBMERSIBLE_1_HP', 'SUBMERSIBLE_1.5_HP', 'SUBMERSIBLE_2_HP']},
    status : {type : String, default : 'NOT_STARTED', enum : [ 'NOT_STARTED', 'STARTED', 'COMPLETED']},
    money : {type : Number, default : 0, required : false},
    description : {type : String, required : true},
    date : {type : Date, required : true},
});

module.exports = mongoose.model('Customer', customerSchema); // "Customer" will be the name of tabel