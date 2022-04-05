const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let schema = new Schema({
	username:{
		type:String,
		required:true
	},
	first_name:{
		type:String,
		required:true
	},
	last_name:{
		type:String,
	},
	email:{
		type:String,
		required:true
	},
	contact_no:{
		type:Number,
		required:true
	},
	password:{
		type:String
	},
	role_id:{
		type:String
	},
	role:{
		type:String
	},
	created_date:{
		type:String,
		default:new Date()
	}
});

schema.static.hashPassword = function hashPassword(password){
	return bcrypt.hashSync(password,10);
}

schema.method.isValid = function (hashedpassword)
{
	return bcrypt.compareSync(hashedpassword,this.password)
}

module.exports  = mongoose.model('Users',schema);
