const express = require('express');
let router = express.Router();
const db = require('./db');

/**
 * USERS-search methods
 * 
 */

 //GET-method for searching user by userId:
router
.route('/users/userId/:userId')
.get((req,res) => {
    db.query('SELECT * FROM users WHERE userId =?',[req.params.userId]).then(results => {
        res.json({results});
        console.log(results);
        })
        .catch(() => {
            res.sendStatus(500);
        })
})

//GET-method for searching user by username:
router
.route('/users/username/:username')
.get((req,res) => {
    
    db.query('SELECT * FROM users WHERE username =?',[req.params.username]).then(results => {
        res.json({results});
        console.log(results);
        })
        .catch(() => {
            res.sendStatus(500);
        })
})

//GET-method for searching user by password:

//Password is hashed so doesnt work without hashing req.params.password too
//NOTWORKING
router
.route('/users/password/:password')
.get((req,res) => {
    
    db.query('SELECT * FROM users WHERE password =?',[req.params.password]).then(results => {
        res.json({results});
        console.log(results);
        })
        .catch(() => {
            res.sendStatus(500);
        })
})

//GET-method for searching user by name:
router
.route('/users/name/:name')
.get((req,res) => {
    
    db.query('SELECT * FROM users WHERE name =?',[req.params.name]).then(results => {
        res.json({results});
        console.log(results);
        })
        .catch(() => {
            res.sendStatus(500);
        })
})

//GET-method for searching user by email:
router
.route('/users/email/:email')
.get((req,res) => {
    
    db.query('SELECT * FROM users WHERE email =?',[req.params.email]).then(results => {
        res.json({results});
        console.log(results);
        })
        .catch(() => {
            res.sendStatus(500);
        })
})

//GET-method for searhing user by phoneNumber:
router
.route('/users/phoneNumber/:phoneNumber')
.get((req,res) => {
    
    db.query('SELECT * FROM users WHERE phoneNumber =?',[req.params.phoneNumber]).then(results => {
        res.json({results});
        console.log(results);
        })
        .catch(() => {
            res.sendStatus(500);
        })
})

//GET-method for searching by category,searchOption and searchValue:
//NEEDMOREWORK
router
.route('/fromAll/:category/:searchOption/:searchValue')
.get((req, res) => 
{
    var category = req.params.category;
    var searchOption = req.params.searchOption;
    var searchValue = req.params.searchValue

    if (category == 'users')
    {
        if(searchOption == 'name')
        {
            
            db.query('SELECT * FROM users WHERE name = ?' ,[req.params.searchValue]).then(results => {
                res.json({results});
                console.log(results);
                })
                .catch(() => {
                    res.sendStatus(500);
                });

                /*db.query('SELECT * FROM '+ category +' WHERE '+ searchOption +'= ?' ,[req.params.searchValue]).then(results => {
                    res.json({results});
                    console.log(results);
                    })
                    .catch(() => {
                        res.sendStatus(500);
                    })*/
            
        }
    }
});



//implementing the search for non-logged in users
//THE SEARCH WORKS IF IN THE DATABASE NO SPACES ARE USED FOR STRINGS (the strings are decoded correctly from the URL tho)
router
.route('/:category/:searchOption/:searchValue')
.get((req, res) => 
{
  //array of bands or albums
  let results = [];

  //let the user search only for bands or albums
  if(req.params.category === "bands")
  {
      // search for bands by name
      if (req.params.searchOption === "bandName") 
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


  
  module.exports = router;