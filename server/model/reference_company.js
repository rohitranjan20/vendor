const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let referenceComp = new Schema({
	vid: [{type: Schema.Types.ObjectId}],
	comp_name:{
		type:String
	},
	comp_address:{
		type:String
	},
	comp_contact_person:{
		type:String
	},
	comp_contact_no:{
		type:String
	},
});


module.exports  = mongoose.model('Reference_company',referenceComp);