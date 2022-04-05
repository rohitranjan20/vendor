var express = require('express');
var router = express.Router();
const config = require('../config/config');
const Vendor = require('../model/vendor');
const ProfileContact = require('../model/profile_contact');
const ContactPerson = require('../model/contact_person');
const ReferenceCompany = require('../model/reference_company');
const multer = require('multer');
const nodemailer = require('../config/mail'); 
const otpGenerator = require('otp-generator');
const otpModel = require('../model/otp');


router.use('/vendor/pan', express.static('uploads/pan'))
var storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/pan');
        // mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});
router.use('/vendor/aadhar', express.static('uploads/aadhar'))
var storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/aadhar');
        // mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});

router.use('/vendor/msme', express.static('uploads/msme'))
var storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/msme');
        // mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});

router.use('/vendor/gst', express.static('uploads/gst'))
var storage4 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/gst');
        // mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});

router.use('/vendor/cheque', express.static('uploads/cancelled_cheque'))
var storage5 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/cancelled_cheque');
        // mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});

router.use('/vendor/insurance', express.static('uploads/vendor_insurance'))
var storage6 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/vendor_insurance');
        // mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});

router.use('/vendor/profile', express.static('uploads/profile'))
var storage7 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile');
        // mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
});

const uploadPan = multer({ storage: storage1 })
const uploadAadhar = multer({ storage: storage2 })
const uploadMsme = multer({ storage: storage3 })
const uploadGst = multer({ storage: storage4 })
const uploadCheque = multer({ storage: storage5 })
const uploadInsurance = multer({ storage: storage6 })
const uploadProfile = multer({ storage: storage7 })

router.post('/vendor/pan', uploadPan.single('documentary_proof'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })

router.post('/vendor/aadhar', uploadAadhar.single('vendor_adhar'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  });

router.post('/vendor/msme', uploadMsme.single('registration_certificate'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })


router.post('/vendor/gst', uploadGst.single('certificate_documentary'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })


router.post('/vendor/cheque', uploadCheque.single('cancelled_cheque_upl'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  });

router.post('/vendor/insurance', uploadInsurance.single('vendor_insurance'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  });


router.post('/vendor/profile', uploadProfile.array("profile[]", 12), (req, res, next) => {
    const file = req.file;
    // console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  });


// 

router.post('/vendor/add', function(req, res, next) {

  try{
		
	   let vendor = new Vendor(req.body);

	  let result = vendor.save(function(err,obj){
  		  console.log(obj);
  		res.send(obj);
  	});

	}catch(e){
    return res.status(500).json(e)
  }

});



router.get('/vendor/vendorid', async(req, res, next) => {

  try{

    Vendor.count({}, ( err, count) => {
        // console.log( "Number of users:", count );
        // var vendrcount = 'VID'+count;
        let vid = count+1;
        let vendrcount = ("00000" + vid).slice(-5);
        vendrcount = 'VID'+vendrcount;
        res.json({ count:vendrcount});

    })

  }catch(e){
    return res.status(500).json(e)
  }

});

router.get('/vendor/detail/:id', async(req, res, next) => {

  try{
      console.log(req.params.id);


      await Vendor.findById(req.params.id, function(err,doc){
        res.send(doc);
      });
      

  }catch(e){
    return res.status(500).json(e)
  }
});

router.post('/vendor/otp', async(req,res,next) => {
  try{
    
   let otp =  otpGenerator.generate(6, { alphabets:false, upperCase: false, specialChars: false });
   

      let ot = new otpModel({
        vid:req.body.vid,
        otp:otp,
        email:req.body.email,
        mobile:req.body.mobile,
        status:'1'
      });

      let result = await ot.save(function(err,obj){
          console.log(obj);
        res.send(obj);
      });


  //  res.send(info);

  }catch(e){
    return res.status(500).json(e);
  }

});

router.get('/vendor/resentotp/:id', async(req,res,next) => {
  try{
    
   let otp =  otpGenerator.generate(6, { alphabets:false, upperCase: false, specialChars: false });
   
    Vendor.findById(req.params.id, function(err, vend){
      if(err) console.log(err);
      
      // res.send(vend);
      // otpModel.deleteMany({mobile:vend.vendor_mobile });

      let ot = new otpModel({
        vid:req.params.id,
        otp:otp,
        email:vend.vendor_email,
        mobile:vend.vendor_mobile,
        status:'1'
      });

      ot.save(function(err,obj){
        res.send(obj);
      });

    });

   

  }catch(e){
    return res.status(500).json(e);
  }

});

router.post('/vendor/matchotp', async(req,res) => {

  try{

      await otpModel.findOne({$or:[{vid:req.body.vendorid, otp:req.body.otp}]}, (err,docs) =>{

        if(err){
          res.send(err);
         
        }
        // console.log(docs);
        res.send(docs);

      });

  }catch(e){
    return res.status(500).json(e);
  }
});

router.delete('/vendor/:id',async(req, res) => {
  try {
      var result = await otpModel.deleteMany({ vid: req.params.id }).exec();
      res.send(result);
      // console.log(result);
  } catch (error) {
      res.status(500).send(error);
  }

});


router.put('/vendor/update/:id',async (req, res) => {
    try {
        var vendor = await Vendor.findById(req.params.id).exec();
        vendor.set(req.body);
        var result = await vendor.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}); 

router.post('/vendor/search', async(req,res) => {
  try{
      let searchdata = req.body.search;
      await Vendor.find({$or:[{vendor_mobile:searchdata}, {pan_no:searchdata},{gst_no:searchdata}]}, (err,docs)=> {
          if(err){
            res.status(404).send({msg:null});
          }

          res.send(docs);
      });

  } catch (error) {
    res.status(500).send(error);
  }

});

router.put('/vendor/:id',async (req, res) => {
    try {
        var vendor = await Vendor.findById(req.params.id).exec();
        vendor.set(req.body);
        var result = await vendor.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}); 

module.exports = router;