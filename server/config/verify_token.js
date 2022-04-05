var config = require('../config/config');
var jwt = require('jsonwebtoken');
let decodeToken = "";


let verifyToken = (req,res,next)=>{
	let token = req.headers.authorization;

	jwt.verify(token,'mysecrt',(err,data) => {
		if(err){
			return res.status(400).json({msg:'Unauthorised'});
		}else{
			config.mytoken = data;
			next();
		}
	})
};

module.exports = verifyToken;