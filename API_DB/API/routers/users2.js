const db = require('./db');
const express = require('express');

//functions of User2 for users.js:
module.exports = {

  //function that is used for getting userinformation by name:
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


  //function used to get users by username (uses the mighty callback method):
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

  //function for adding a new user:
  addUser: (username, password, name, email, phoneNumber) => {
    db.query('INSERT INTO users (username,password,name,email,phoneNumber)VALUES (?,?,?,?,?);'
    ,[username,password,name,email,phoneNumber]);
    console.log("201,created");
  }
}