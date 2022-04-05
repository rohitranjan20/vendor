var express = require('express');
var router = express.Router();
const config = require('../config/config');
const Country = require('../model/country');
const State = require('../model/state');
const City = require('../model/city');


router.post('/location/country', async(req, res, next) => {

  try{
		
	   let country = new Country(req.body);

	  let result = country.save(function(err,obj){
  		  console.log(obj);
  		res.send(obj);
  	});

	}catch(e){
    return res.status(500).json(e)
  }

});


router.get('/location/country', async(req,res) =>{

	try{

		let country = await Country.find().exec();

		return res.send(country);

	}catch(e){
		return res.status(500).json(e);
	}

});

router.post('/location/state', function(req, res, next) {

  try{
		
	   let state = new State(req.body);

	  let result = state.save(function(err,obj){
  		  console.log(obj);
  		res.send(obj);
  	});

	}catch(e){
    return res.status(500).json(e)
  }

});

router.get('/location/state/:countryid', async(req,res) => {

	try{

		await State.find({country_id:req.params.countryid}, (err,statedata)=>{

			if(err)
			{
				res.send(err);
			}

			res.send(statedata);
		});

		


	}catch(e){
		return res.status(500).json(e)
	}

});


router.post('/location/city', function(req, res, next) {

  try{
		
	    let city = new City(req.body);

	  	let result = city.save(function(err,obj){
	  		  console.log(obj);
	  		res.send(obj);
	  	});

	}catch(e){
    return res.status(500).json(e)
  }

});

router.get('/location/city/:cityid', async(req,res) => {

	try{

		await City.find({state_id:req.params.cityid}, (err,citydata)=>{

			if(err)
			{
				res.send(err);
			}

			res.send(citydata);
		});

		


	}catch(e){
		return res.status(500).json(e)
	}

});


module.exports = router;