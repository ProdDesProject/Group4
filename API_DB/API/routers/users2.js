<<<<<<< HEAD
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const express = require('express');
const { expect } = require('chai');
const { json } = require('body-parser');
const { count } = require('console');
let router = express.Router();

/*let users = [
  {
    id: 1,
    username: "tester",
    email: "tester@mail.com",
    password: "$2y$06$PhZ74dT8/5g6B8SgssFq6ey4ojLxmP6pos2DcevMUGw25Vc9jGEou", 
    // testerpassword
    name: "tester2",
    streetaddress: "testerway 1",
    city: "testcity",
    country: "testland",
    dateofbirth: "12.12.1990",
    validApiKey: null
    
  }
  
];

let userObject = {
    "id": 0,
    "username": "Kilpikalevi",
    "name": "Taneli",
    "streetaddress": "Apinakuja 2",
    "city": "Oulu",
    "country": "Suomi",
    "email": "Apina@gmail.com",
    "password": "Salis12",
    "dateofbirth": "12.12.1990"
};*/

module.exports = {
  //getUserById: (id) => users.find(u => u.id == id),
  //getUserByName: (username) => users.find(u => u.username == username),
  getUserByName: async function(username){
    var results2;
    var username2;
    
    var results = await db.query('SELECT * FROM users;');
    
    results2= results.find(u => u.username == username)
    username2 = results2.username;

    if (username2 == username)
      {
        console.log("going back");
        console.log(results2);
        return results2;
      }
      else{
        return undefined;
      }
  },


  //function used to get users by username (uses the mighty callback method)
  getUserByUsername(username, callback)
  {
    db.query('SELECT * FROM users WHERE username = ?', [username], function(err, result)
    {
        if (err) 
            //sql command error
            callback(err, null);
        else
        {
          //return the first found username (it is the one we want because usernames are unique)
          callback(null, result[0]);
        }
    });
  },

  addUser: (username, password, name, email, phoneNumber) => {
    db.query('INSERT INTO users (username,password,name,email,phoneNumber)VALUES (?,?,?,?,?);'
    ,[username,password,name,email,phoneNumber]);
    console.log("201,created");
  }

/*resetApiKey: (userId) => {
    const user = users.find(u => u.id == userId);
    if(user === undefined)
    {
      return false
    }

    user.validApiKey = uuidv4();
    return user.validApiKey;
  },*/
  /*getApiKey: (userId) => {
    const user = users.find(u => u.id == userId);
    if(user === undefined)
    {
      return false
    }

    return user.validApiKey;
  },*/
  //getUserWithApiKey: (apiKey) => users.find(u => u.validApiKey == apiKey),
  
  //toimii
  /*getUser0: (id) => {
    return users[id];
  },


  getAllUsers: () => {

      return users;
  },*/  

}

=======
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const express = require('express');
const { expect } = require('chai');
const { json } = require('body-parser');
const { count } = require('console');
let router = express.Router();

/*let users = [
  {
    id: 1,
    username: "tester",
    email: "tester@mail.com",
    password: "$2y$06$PhZ74dT8/5g6B8SgssFq6ey4ojLxmP6pos2DcevMUGw25Vc9jGEou", 
    // testerpassword
    name: "tester2",
    streetaddress: "testerway 1",
    city: "testcity",
    country: "testland",
    dateofbirth: "12.12.1990",
    validApiKey: null
    
  }
  
];

let userObject = {
    "id": 0,
    "username": "Kilpikalevi",
    "name": "Taneli",
    "streetaddress": "Apinakuja 2",
    "city": "Oulu",
    "country": "Suomi",
    "email": "Apina@gmail.com",
    "password": "Salis12",
    "dateofbirth": "12.12.1990"
};*/

module.exports = {
  //getUserById: (id) => users.find(u => u.id == id),
  //getUserByName: (username) => users.find(u => u.username == username),
  getUserByName: async function(username)
  {
    var results2;
    var username2;
    
    var results = await db.query('SELECT * FROM users;');
    
    results2= results.find(u => u.username == username)
    username2 = results2.username;

    if (username2 == username)
    {
      console.log("going back");
      console.log(results2);
      return results2;
    }
    else
    {
      return undefined;
    }
  },

  //function used to get users by username (uses the mighty callback method)
  getUserByUsername(username, callback)
  {
    db.query('SELECT * FROM users WHERE username = ?', [username], function(err, result)
    {
        if (err) 
            //sql command error
            callback(err, null);
        else
        {
          //return the first found username (it is the one we want because usernames are unique)
          callback(null, result[0]);
        }
    });
  },

  addUser: (username, password, name, email, phoneNumber) => {
    db.query('INSERT INTO users (username,password,name,email,phoneNumber)VALUES (?,?,?,?,?);'
    ,[username,password,name,email,phoneNumber]);
    console.log("201,created");
  }

/*resetApiKey: (userId) => {
    const user = users.find(u => u.id == userId);
    if(user === undefined)
    {
      return false
    }

    user.validApiKey = uuidv4();
    return user.validApiKey;
  },*/
  /*getApiKey: (userId) => {
    const user = users.find(u => u.id == userId);
    if(user === undefined)
    {
      return false
    }

    return user.validApiKey;
  },*/
  //getUserWithApiKey: (apiKey) => users.find(u => u.validApiKey == apiKey),
  
  //toimii
  /*getUser0: (id) => {
    return users[id];
  },


  getAllUsers: () => {

      return users;
  },*/  

}

>>>>>>> origin/Musasampo2.0
