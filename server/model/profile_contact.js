const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let profileContact = new Schema({
	vid: [{type: Schema.Types.ObjectId}],
	profile_contact_name:{
		type:String
	},
	profile_contact_no:{
		type:String
	},
});

module.exports  = mongoose.model('Profile_contact',profileContact);