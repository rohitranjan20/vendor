const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contactDetail = new Schema({
	vid: [{type: Schema.Types.ObjectId}],
	contact_pname:{
		type:String,
		required:true
	},
	contact_pdesignations:{
		type:String,
		required:true
	},
	contact_pmobile:{
		type:String,
		required:true
	},
	contact_plandline:{
		type:String
	},
	contact_pfax:{
		type:String
	},
	contact_pemail:{
		type:String
	}
});


module.exports  = mongoose.model('Contact_person',contactDetail);
