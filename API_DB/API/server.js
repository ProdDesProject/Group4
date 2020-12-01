const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs');
const bcrypt = require('bcryptjs');
const app = express()
const port = 9000
var cors = require("cors");
const users = require('./routers/users.js');
const bands = require('./routers/bands.js');
const albums = require('./routers/albums.js');
const songs = require('./routers/songs.js');
const users2 = require('./routers/users2.js');
const search = require('./routers/search.js');
const db = require('./routers/db.js');
const upload = require('./routers/upload');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', users);
app.use('/bands',bands);
app.use('/albums',albums);
app.use('/songs', songs);
app.use('/search', search);
app.use('/upload', upload);

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

//login credentials check for jwt retrieval
passport.use(new BasicStrategy(
  function(username, password, done) 
  {
    users2.getUserByUsername(username, function(err, user)
    {
      if (err) 
      {
        // error handling code goes here
        return done(null, false, { message: "Wrong credentials" });            
      } 
      else 
      {            
          // code to execute on data retrieval from db
          //check if user was found(it will be undefined if not)
          if(!user) 
          {
              console.log("User does not exist");
              return done(null, false, { message: "User does not exist" });
          }
          //verify username match
          if(!user.username) 
          {
              // Username not found
              console.log("HTTP Basic username not found");
              return done(null, false, { message: "HTTP Basic username not found" });
          }
          
          /* Verify password match */
          if(!bcrypt.compareSync(password, user.password)) 
          {
              // Password does not match
              console.log("HTTP Basic password not matching username");
              return done(null, false, { message: "HTTP Basic password not found" });
          }

          //console.log("User gets token");
          return done(null, user);
        }    
    })
  }
));

app.get('/httpBasicProtectedResource',
        passport.authenticate('basic', { session: false }),
        (req, res) => 
{
  res.json({ yourProtectedResource: "profit" });
});

//JWT authentication
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecretKey = require('./jwt-key.json');
const { render } = require('ejs');

let options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = jwtSecretKey.secret;

passport.use(new JwtStrategy(options, function(jwt_payload, done) 
{ 
  const now = Date.now() / 1000;
  if(jwt_payload.exp > now) 
  {
    //exports key and user
    done(null, jwt_payload.user);
  }
  else 
  {
    // expired
    done(null, false);
  }
}));

app.get('',(req, res) => 
{
  res.send("/Welcome, go to /main Login:{tester,testerpassword}");
});

//login function return token
function login (req)
{
    const body = {
      id: req.user.userId,
      email : req.user.email
    };

    const payload = 
    {
      user : body
    };

    const options = 
    {
      expiresIn: '1d'
    }

    const token = jwt.sign(payload, jwtSecretKey.secret, options);
    
    return token;
}

app.post(
  '/login',passport.authenticate('basic', { session: false }),
  (req, res) => 
  {
    const token = login(req);
    //add the token to the userToken field
    db.query("UPDATE users SET usersToken = ? WHERE userId = ?", [token, req.user.userId]);
    //return token and ok status
    return res.status(200).json({ token });
})

//need updated index.html from Stefan 
//https://app.swaggerhub.com/apis-docs/OAMK81/MusasampoAPI/2.2#/

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
    console.log(`Musasampo app listening at http://localhost:${port}`)
  })
}

exports.stop = () => {
  apiInstance.close();
}