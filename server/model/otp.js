const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let otp = new Schema({
    vid: {type: Schema.Types.ObjectId},
    otp:{type:String},
    email:{type:String},
    mobile:{type:String},
    status:{type:Number},
    created_date:{
        type:String,
        default:new Date()
    }

});

module.exports  = mongoose.model('Otp',otp);