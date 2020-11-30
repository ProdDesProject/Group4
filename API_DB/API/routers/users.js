
const express = require('express');
var bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
let router = express.Router();

const users2 = require('./users2');
const server = require('../server');
const db = require('./db');

const passport = require('passport');
const { getUserByName } = require('./users2');
const BasicStrategy = require('passport-http').BasicStrategy;

const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecretKey = require('../jwt-key.json');

/*let Userdata = [
    {
        userId: 0,
        username: "Kilpikalevi",
        password: '$2y$06$PhZ74dT8/5g6B8SgssFq6ey4ojLxmP6pos2DcevMUGw25Vc9jGEou', //testerpassword
        name: "Taneli",
        email: "Apina@gmail.com",
        phoneNumber: "01234"
    }
  ];*/
  
  /*
  let userObject = {
        "userId": 0,
        "username": "Kilpikalevi",
        "password": "$2y$06$PhZ74dT8/5g6B8SgssFq6ey4ojLxmP6pos2DcevMUGw25Vc9jGEou",
        "name": "Taneli",
        "email": "Apina@gmail.com",
        "phoneNumber": "01234"
  };*/

//get all users (test only)
router
.route('')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM users;').then(results => 
    {
        //show all users
        res.json({ user: results});
    })
    .catch(() => 
    {
        //internal server error
        res.sendStatus(500);
    })
    /*let user = users2.getAllUsers()
    res.json({user});*/
});

router.post("/asd", function(req, res, next) {
    res.send("API is working properly");
});

router
.route('/checkuser/:username')
.get(
    (req, res) => {
    db.query('SELECT * FROM users WHERE username = ?;',[req.params.username]).then(results => 
    {
        //show all users
        res.json({ user: results});
    })
    .catch(() => 
    {
        //internal server error
        res.sendStatus(500);
    })
    /*let user = users2.getAllUsers()
    res.json({user});*/
});

router
.route('/checkuser2/')
.post(
    (req, res) => {
    db.query('SELECT * FROM users WHERE username = ?;',[req.body.username]).then(results => 
    {
        if(!results.length)
        {
            res.status(404).json({message: "Username not found: error 404"});
        }
        else
        {
            //var username = req.body.username;
            var password = req.body.password;

            console.log(results[0].password);

            //results.body.password

            //have to get for-loop for checking password.

            if(!bcrypt.compareSync(password,results[0].password)) 
            {
                // Password does not match
                console.log("HTTP Basic password not matching username");
                //return done(null, false, { message: "HTTP Basic password not found" });
                res.status(400).json({message: "Password not matching username: error 400"});
            }
            else
            {
                res.status(200).json({ user: results });
            }
        }
        

    })
    .catch(() => 
    {
        //internal server error
        res.status(500).json({message: "Internal server error: 500"});
    })
    /*let user = users2.getAllUsers()
    res.json({user});*/
});
 
//create a new user
router
.route('/createuser')
.post(
    (req, res) => 
    {
        if(!req.body.username || !req.body.password || !req.body.email || !req.body.name)
        {
            //bad request, required fields not filled!!!
            console.log("Fields not filled")
            res.sendStatus(400);
        }
        else
        {
            //search for the database 
            db.query('SELECT username FROM users;')
            .then(results => 
            {
                //array of existing usernames
                var usernames = [];
                //res.json({ user: results})
                usernames = results;

                //search for already existing usernames
                var found = usernames.find(u => u.username == req.body.username);
                
                //nothing is found, create a new user
                if(found == null) 
                {
                    const hashedPassword = bcrypt.hashSync(req.body.password, 6);
                    //console.log(hashedPassword, req.body.username, req.body.name, req.body.email, req.body.phoneNumber);
                    users2.addUser(
                        req.body.username,
                        hashedPassword,
                        req.body.name,
                        req.body.email,
                        req.body.phoneNumber
                    )
                    //send created status 
                    res.sendStatus(201);
                } 
                else
                {
                    //send bad request status
                    res.sendStatus(400);
                }
            })
        }
    });

//delete a user based on id(only logged in users should be able to do that)
router
.route('/delete/:userId')
.delete(
    //authentication required
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        //check if the id exists in the database first
        //we need to send not found response if id is not found
        db.query('SELECT userId FROM users WHERE userId = ?;', [req.params.userId]).then(results => 
        {
            //check for results
            if (results.length)
            {
                //user id found, delete user from the database
                db.query('DELETE FROM users WHERE userId = ?',[req.params.userId]);
                //deincrement the user id field
                db.query('ALTER TABLE bands AUTO_INCREMENT = ?',[(req.params.userId - 1)]); 
                //send ok status
                res.sendStatus(200);
            }
            else
            {
                //user id not found, cannot be deleted
                res.sendStatus(404);
            }
        });
    });

  module.exports = router;