const express = require('express');
let router = express.Router();
const db = require('./db');


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
      } //search for bands by bandId
      else if (req.params.searchOption === "bandId") 
      {
        // call function to get all requested bands from the database
        var  getInformationFromDB = function(callback) 
        {
            db.query('SELECT * FROM bands WHERE bandId = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
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
                        "message": "There are no bands with this id."
                    });
                }
            }
        });
      }
      else
      {
          //bad request
          return res.status(400).json({
          "message": "Search only by name or bandId!"
        });
      }
  }
  else if (req.params.category === "albums")
  {
      // search for albums by name
      if (req.params.searchOption === "albumId") 
      {
        // call function to get all requested albums from the database
        var  getInformationFromDB = function(callback) 
        {
            db.query('SELECT * FROM albums WHERE albumId = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
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
                        "message": "There are no albums with this albumId."
                    });
                }
            }
        });
      } //search for albums by bandId
      else if (req.params.searchOption === "bandId") 
      {
        // call function to get all requested albums from the database
        var  getInformationFromDB = function(callback) 
        {
            db.query('SELECT * FROM albums WHERE bandId = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
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
                        "message": "There are no albums from this band."
                    });
                }
            }
        });
      }
      else
      {
          //bad request
          return res.status(400).json({
          "message": "Search only by albumId or bandId!"
        });
      }
  }
  else if(req.params.category === 'songs')
  {
        // search for songs by albumId
        if (req.params.searchOption === "albumId") 
        {
            // call function to get all requested songs from the database
            var  getInformationFromDB = function(callback) 
            {
                db.query('SELECT * FROM songs WHERE albumId = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
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
                            "message": "There are no songs from this album."
                        });
                    }
                }
            });
        } //search for songs by songName
        else if (req.params.searchOption === "songName") 
        {
            // call function to get all requested albums from the database
            var  getInformationFromDB = function(callback) 
            {
                db.query('SELECT * FROM songs WHERE songName = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
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
                            "message": "There are no songs with this name."
                        });
                    }
                }
            });
        }
        else
        {
            //bad request
            return res.status(400).json({
            "message": "Search only by albumId or songName!"
            });
        }
  }
  else if(req.params.category === 'users')
  {
        // search for users by username
        if (req.params.searchOption === "username") 
        {
            // call function to get all requested songs from the database
            var  getInformationFromDB = function(callback) 
            {
                db.query('SELECT * FROM users WHERE username = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
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
                            "message": "There are no users with this username."
                        });
                    }
                }
            });
        } //search for users by userId
        else if (req.params.searchOption === "userId") 
        {
            // call function to get all requested albums from the database
            var  getInformationFromDB = function(callback) 
            {
                db.query('SELECT * FROM users WHERE userId = ?;',[decodeURIComponent(req.params.searchValue)], function(err, res, fields)
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
                            "message": "There are no users with this userId."
                        });
                    }
                }
            });
        }
        else
        {
            //bad request
            return res.status(400).json({
            "message": "Search only by username or userId!"
            });
        }
    }
  else
  {
    //bad request
    return res.status(400).json({
      "message": "Search only for bands, albums, songs or users!"
    });
  }
});


  
  module.exports = router;