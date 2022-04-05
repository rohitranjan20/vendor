var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Users = require('../model/user');
const config = require('../config/config');
const verifyToken = require('../config/verify_token');
