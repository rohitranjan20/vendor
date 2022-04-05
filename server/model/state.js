const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
	sid:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	country_id:{
		type:String,
		required:true
	},
});


module.exports  = mongoose.model('state',schema);
