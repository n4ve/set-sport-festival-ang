// Fast html framework
var express = require('express');
var app = express();
var multer  = require('multer')
var moment = require('moment')
 
// For receiving JSON in posts
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({'extended':'true'}));   
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const port = 5000;
 
// For the database
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('../db/set-festival.db');
var csv = require('fast-csv');

var upload = multer({ dest: 'uploads/' })

// Add restful controller
require('./ScoreController')(app, db, jsonParser);
require('./UploadScoreController')(app, db, csv, upload,moment);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
  });


