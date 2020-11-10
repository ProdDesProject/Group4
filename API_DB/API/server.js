const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs');
const bcrypt = require('bcryptjs');
const fetch = require("node-fetch");
const app = express()

const port = 9000
var cors = require("cors");

//const login = require('./routers/login');
const users = require('./routers/users.js');
const bands = require('./routers/bands.js');
const albums = require('./routers/albums.js');
const songs = require('./routers/songs.js');
const users2 = require('./routers/users2.js');
const search = require('./routers/search.js');

const db = require('./routers/db.js');
//const imageUpload = require('./routers/imageupload');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//app.use('/login', login);
app.use('/users', users);

//app.use(bands.router);
//app.use(albums.router);

app.use('/bands',bands);
app.use('/albums',albums);
app.use('/songs', songs);
app.use('/search', search);

//app.use('/fileUpload', imageUpload);

const passport = require('passport');
const { send } = require('process');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
  async function(username, password, done) {

    const user = await users2.getUserByName(username);
    if(user == undefined) {
      // Username not found
      console.log("HTTP Basic username not found");
      return done(null, false, { message: "HTTP Basic username not found" });
    }

    /* Verify password match */
    if(bcrypt.compareSync(password, user.password) == false) {
      // Password does not match
      console.log("HTTP Basic password not matching username");
      return done(null, false, { message: "HTTP Basic password not found" });
    }
    return done(null, user);
  }
));

app.get('',passport.authenticate('basic',{ session: false }),(req, res) => 
{
  res.send("/Welcome, go to /main Login:{tester,testerpassword}");
});

app.route('/main').get(passport.authenticate('basic',{ session: false }), function(req, res)
{
    fs.readFile(__dirname + '/mainpage.html', 'utf8', function(err, html)
    {
        if(err){
            console.log(err);
        }else{
            res.send( 
              html
            );
        }
    });
});

app.route('/documents').get( function(req, res) 
{
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, html)
    {
        if(err){
            console.log(err);
        }else{
            res.send( 
              html
            );
        }
    });
});


let apiInstance = null;
exports.start = () => {
  apiInstance = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

exports.stop = () => {
  apiInstance.close();
}


