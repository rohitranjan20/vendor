var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Users = require('../model/user');
const config = require('../config/config');
const verifyToken = require('../config/verify_token');

const State = require('../model/state');
const Member = require('../model/member');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', function(req, res, next) {
	let user = new Users({
		username:req.body.username,
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		email:req.body.email,
		contact_no:req.body.contact_no,
		role_id:req.body.role_id,
		role:req.body.role,
		password:bcrypt.hashSync(req.body.password,10),
	});

	user.save(function(err,userdata){
		if(err){
			console.log(err)
		}
		res.status(200).json({result:userdata});
	});

	

});

router.post('/login', function(req, res, next) {

	console.log(req.body);
	// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
	let promise = Users.findOne({email:req.body.email});

		promise.then((doc) => {
			if(doc){
				let validpassword = bcrypt.compareSync(req.body.password,doc.password);

				if(!validpassword)
				{
					return res.status(404).json({msg:'Password is not valid'});
				}else{
					let secret = "mysecrt";

					let token = jwt.sign({ id:doc._id }, secret,{ expiresIn: '1d' });

					return res.status(201).json({token:token,result:doc});
				}
			}

		});

});


router.get('/tokenverify',verifyToken,(req,res,next)=>{
	return res.status(201).json(config.mytoken);

});

router.get('/admindetail',verifyToken, function(req,res,next) {

	//let promise = Users.

});

// router.get('/isLoggedIn')

// router.get('/users', paginatedResults(State), (req, res) => {
/*router.get('/users/:offset/:limit', async(req, res) => {
	let offset = req.params.offset;
    let limit = req.params.limit;
	let results = await model.find().limit(limit).skip(offset).exec()
	let totalcount = await model.count().exec()
  res.status(201).json({results:results,totalcount:totalcount});
})*/


router.get('/users',(req,res) => {
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // Find some documents
       Member.find({},{},query,function(err,data) {
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {

            	rescnt = "";
            	Member.count({},function(err1,count){
            		if(err1) console.log(err1);
            		rescnt = {"error" : false,"results" : data,"totalcount":count};
            		res.json(rescnt);
            	})
            	// response = rescnt;
                
            }
            
        });
});

function paginatedResults(model)
{
	return async(req,res, next) =>{
		const page = parseInt(req.query.page)
		const limit = parseInt(req.query.limit)

		const startIndex = (page - 1)*limit
		const endIndex = page*limit

		const results = {}

		if(endIndex < await model.countDocuments().exec())
		{
			results.next = {
				page: page+1,
				limit:limit
			}
		}

		if(startIndex > 0)
		{
			results.previous = {
				page: page-1,
				limit:limit
			}
		}

		try{
			results.results = await model.find().limit(limit).skip(startIndex).exec()
			results.totalcount = await model.count().exec()
			res.paginatedResults = results
			next()

		} catch(e){
			res.status(500).json({message:e.message})
		}
	}
}

module.exports = router;
