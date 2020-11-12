const express = require('express');
const parseobj = require('xml2js');

let router = express.Router();
const db = require('./db');

const passport = require('passport');
const { render } = require('ejs');
const BasicStrategy = require('passport-http').BasicStrategy;

/*let Songsdata = [
    {
        albumId: "1",
        songId: "1"
        songName: "Evil Has No Boundaries",
        MP3: "evilhasnoboundaries.mp3",
        MP4: "evilhasnoboundaries.mp4"
    }
];*/

/*
  let SongObject = {
        "albumId": "1",
        "songId": "1",
        "songName": "Evil Has No Boundaries",
        "MP3": "evilhasnoboundaries.mp3",
        "MP4": "evilhasnoboundaries.mp4"
  };*/


router
.route('')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM songs;').then(results => {
        res.json({ songs: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
    /*let user = users2.getAllUsers()
    res.json({user});*/
});

router
.route(':songId')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
        console.log("Ppp");
        db.query('SELECT * FROM songs where songId = ?;',[req.params.songId]).then(results => {
        res.json({ songs: results})
        
    })
    .catch(() => {
        res.sendStatus(500);
    })
      /*let user = users2.getAllUsers()
      res.json({user});*/
});

router
.route('/searchByName/:songName')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM songs where songName = ?;',[req.params.songName]).then(results => {
        res.json({ songs: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
      /*let user = users2.getAllUsers()
      res.json({user});*/
});

router
  .route('/createsong')
  .post(
      //bands need to be authenticated in order to add songs
      passport.authenticate('jwt', { session: false }),
      (req, res) => 
      {
        //check field filling
        if(req.body.songName && req.body.MP3 && req.body.MP4)
        {   
            //create song if all fields are filled
            db.query('INSERT INTO songs (songName,MP3,MP4)VALUES(?,?,?);',[req.body.songName, req.body.MP3, req.body.MP4]);
            //send created status
            res.sendStatus(201);
        }
        else
        {
            //bad request
            res.sendStatus(400);
        }
    });

//modify a song
router
.route('/modify/:songId')
.put(
    //a band needs to be authenticated to modify songs
    passport.authenticate('jwt', { session: false }),
    (req,res) => 
    { 
        db.query('SELECT songId FROM songs WHERE songId = ?;', [req.params.songId]).then(results => 
            {
                    //check for results
                    if (results.length)
                    {
                        //check field filling
                        if(req.body.songName && req.body.MP3 && req.body.MP4)
                        {
                            //modify the song 
                            db.query('UPDATE songs SET songName = ?,MP3 = ?,MP4 = ?, WHERE songId = ?',[req.body.songName, req.body.MP3, req.body.MP4, req.params.songId]);
                            //send ok status
                            res.sendStatus(200);
                        }
                        else
                        {
                            //fields not filled, bad request
                            res.sendStatus(400);
                        }
                    }
                    else
                    {
                        //song id not found, cannot be modified
                        res.sendStatus(404);
                    }
            });
    });

//delete a song
router
.route('/delete/:songId')
.delete(
    //a band needs authentication to delete a song
    passport.authenticate('jwt', { session: false }),
    (req, res) => 
    {
        //check if the id exists in the database first
        //we need to send not found response if id is not found
        db.query('SELECT songId FROM songs WHERE songId = ?;', [req.params.songId]).then(results => 
            {
                //check for results
                if (results.length)
                {
                    //delete found song
                    db.query('DELETE FROM songs WHERE songId = ?',[req.params.songId]);
                    //deincrement the song id field
                    db.query('ALTER TABLE songs AUTO_INCREMENT=?',[(req.params.songId - 1)]); 
                    //send ok status
                    res.sendStatus(200);
                }
                else
                {
                    //song id not found, cannot be deleted
                    res.sendStatus(404);
                }
            });
    });

module.exports = router;
