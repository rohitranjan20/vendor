const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
	cid:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	}
});


module.exports  = mongoose.model('country',schema);
