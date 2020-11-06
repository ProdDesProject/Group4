const express = require('express');
var bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
let router = express.Router();


const users2 = require('./users2');
const db = require('./db');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

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

//toimii
router
.route('')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM users;').then(results => {
        res.json({ user: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
    /*let user = users2.getAllUsers()
    res.json({user});*/
});
  
router
.route('/createuser')
.post(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {

      const hashedPassword = bcrypt.hashSync(req.body.password, 6);
      console.log(hashedPassword, req.body.username, req.body.name, req.body.email, req.body.phoneNumber);
      users2.addUser(
          req.body.username,
          hashedPassword,
          req.body.name,
          req.body.email,
          req.body.phoneNumber
          )
      res.sendStatus(201);
  });


router
  .route('/createusertest')
  .post(
      //passport.authenticate('basic', { session: false }),
      (req, res) => {
        db.query('INSERT INTO users (username,password,name,email,phoneNumber)VALUES (?,?,?,?,?);',[req.body.username, req.body.password, req.body.name, req.body.email, req.body.phoneNumber]);
        //const hashedPassword = bcrypt.hashSync(req.body.password, 6);
        res.sendStatus(201);
    });

router
.route('/delete/:userId')
.delete(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
        db.query('DELETE FROM users WHERE userId = ?',[req.params.userId]);
        /*let Itemid = req.params;
        console.log(Itemid.id);
        console.log(ItemsData[Itemid.id]);
        ItemsData.splice(Itemid.id,ItemsData.length);
        console.log(ItemsData);*/
        res.sendStatus(200);
    })
  
  module.exports = router;