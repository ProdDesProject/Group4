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
      //passport.authenticate('basic', { session: false }),
      (req, res) => {
        db.query('INSERT INTO songs (songName,MP3,MP4)VALUES(?,?,?);',[req.body.songName, req.body.MP3, req.body.MP4, req.body.albumGenre]);
        //const hashedPassword = bcrypt.hashSync(req.body.password, 6);
        res.sendStatus(201);
    });

router
.route('/:songId')
.put(
    //passport.authenticate('basic', { session: false }),
    (req,res) => { 
    db.query('UPDATE songs SET songName = ?,MP3 = ?,MP4 = ?, WHERE songId = ?'
    ,[req.body.songName,req.body.MP3,req.body.MP4,req.params.songId]);
    res.sendStatus(201);
})

router
.route('/delete/:songId')
.delete(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
        db.query('DELETE FROM songs WHERE songId = ?',[req.params.songId]);
        /*let Itemid = req.params;
        console.log(Itemid.id);
        console.log(ItemsData[Itemid.id]);
        ItemsData.splice(Itemid.id,ItemsData.length);
        console.log(ItemsData);*/
        res.sendStatus(200);
    })

module.exports = router;

