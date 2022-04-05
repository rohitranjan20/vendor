var mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;

var memberschema = {
	"first_name":String,
	"last_name":String,
	"email":String,
	"gender":String,
	"ip_address":String,
}

module.exports = mongoose.model('members',memberschema);