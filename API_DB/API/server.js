const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs');
const bcrypt = require('bcryptjs');
const fetch = require("node-fetch");
const app = express()
const port = 3000

//const login = require('./routers/login');
const users = require('./routers/users.js');
const bands = require('./routers/bands.js');
const albums = require('./routers/albums.js');
const songs = require('./routers/songs.js');
const users2 = require('./routers/users2.js');
const db = require('./routers/db.js');
//const imageUpload = require('./routers/imageupload');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//app.use('/login', login);
app.use('/users', users);
app.use(bands.router);
app.use(albums.router);
app.use('/songs', songs);
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

app.get('',(req, res) => 
{
  res.send("/Welcome, go to /main Login:{tester,testerpassword}");
});

app.route('/main').get(/*passport.authenticate('basic',{ session: false }),*/ function(req, res)
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

//implementing the search for non-logged in users
//THE SEARCH WORKS IF IN THE DATABASE NO SPACES ARE USED FOR STRINGS (the strings are decoded correctly from the URL tho)
app.get('/search/:category/:searchOption/:searchValue', (req, res) => 
{
  //array of bands or albums
  let results = [];

  //let the user search only for bands or albums
  if(req.params.category === "bands")
  {
      // search for bands by name
      if (req.params.searchOption === "name") 
      {
            // call function to get all requested bands from the database
            var  getInformationFromDB = function(callback) 
            {
                db.query('SELECT * FROM bands WHERE bandName = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
                {
                    if (err)  return callback(err);
                    if(res.length)
                    {
                        for(var i = 0; i < res.length; i++)
                        {     
                            results.push(res[i]);
                        }
                    }
                  callback(null, results);
                });
            };

            getInformationFromDB(function (err, result) 
            {
                if (err) 
                {
                  console.log("Internal server error!");
                  return res.status(500).json ({"message": "Internal server error!"});
                }
                else 
                {
                    //if something is found
                    if (result.length) 
                    {
                        return res.status(200).json(result);
                    } 
                    else 
                    {
                        //nothing is found
                        return res.status(404).json({
                            "message": "There are no bands with this name."
                        });
                    }
                }
            });
      } //search for bands by country
      else if (req.params.searchOption === "country") 
      {
        // call function to get all requested bands from the database
        var  getInformationFromDB = function(callback) 
        {
            db.query('SELECT * FROM bands WHERE country = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
            {
                if (err)  return callback(err);
                if(res.length)
                {
                    for(var i = 0; i < res.length; i++)
                    {     
                        results.push(res[i]);
                    }
                }
              callback(null, results);
            });
        };
        
        getInformationFromDB(function (err, result) 
        {
            if (err) 
            {
              console.log("Internal server error!");
              return res.status(500).json ({"message": "Internal server error!"});
            }
            else 
            {
                //if something is found
                if (result.length) 
                {
                    return res.status(200).json(result);
                } 
                else 
                {
                    //nothing is found
                    return res.status(404).json({
                        "message": "There are no bands from this country."
                    });
                }
            }
        });
      }
      else
      {
          //bad request
          return res.status(400).json({
          "message": "Search only by name or country!"
        });
      }
  }
  else if (req.params.category === "albums")
  {
      // search for albums by name
      if (req.params.searchOption === "name") 
      {
        // call function to get all requested albums from the database
        var  getInformationFromDB = function(callback) 
        {
            db.query('SELECT * FROM albums WHERE albumName = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
            {
                if (err)  return callback(err);
                if(res.length)
                {
                    for(var i = 0; i < res.length; i++)
                    {     
                        results.push(res[i]);
                    }
                }
              callback(null, results);
            });
        };
    
        getInformationFromDB(function (err, result) 
        {
            if (err) 
            {
              console.log("Internal server error!");
              return res.status(500).json ({"message": "Internal server error!"});
            }
            else 
            {
                //if something is found
                if (result.length) 
                {
                    return res.status(200).json(result);
                } 
                else 
                {
                    //nothing is found
                    return res.status(404).json({
                        "message": "There are no albums with this name."
                    });
                }
            }
        });
      } //search for albums by genre
      else if (req.params.searchOption === "genre") 
      {
        // call function to get all requested albums from the database
        var  getInformationFromDB = function(callback) 
        {
            db.query('SELECT * FROM albums WHERE albumGenre = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
            {
                if (err)  return callback(err);
                if(res.length)
                {
                    for(var i = 0; i < res.length; i++)
                    {     
                        results.push(res[i]);
                    }
                }
              callback(null, results);
            });
        };
        
        getInformationFromDB(function (err, result) 
        {
            if (err) 
            {
              console.log("Internal server error!");
              return res.status(500).json ({"message": "Internal server error!"});
            }
            else 
            {
                //if something is found
                if (result.length) 
                {
                    return res.status(200).json(result);
                } 
                else 
                {
                    //nothing is found
                    return res.status(404).json({
                        "message": "There are no albums within this genre."
                    });
                }
            }
        });
      }
      else
      {
          //bad request
          return res.status(400).json({
          "message": "Search only by name or genre!"
        });
      }
  }
  else
  {
    //bad request
    return res.status(400).json({
      "message": "Search only for bands or albums!"
    });
  }
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


