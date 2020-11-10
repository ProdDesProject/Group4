const api = require('./server');
const express = require('express')
//var cors = require("cors");
const app = express()
//app.use(cors());

api.start();