const express = require('express');
const parseobj = require('xml2js');

let router = express.Router();
const db = require('./db.js');

const passport = require('passport');

router
.route('')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM albums;').then(results => 
        {
        if(results != undefined)
        {
            res.json({ albums: results})
        }
        else
        {
            //no albums in the database
            res.sendStatus(404);
        }
    })
    .catch(() => {
        res.sendStatus(500);
    })
    /*let user = users2.getAllUsers()
    res.json({user});*/
});

router
.route('/bandId/:bandId')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM albums where bandId = ?;',[req.params.bandId]).then(results => {
        res.json({ albums: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
      /*let user = users2.getAllUsers()
      res.json({user});*/
});

router
.route('/:albumId')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM albums where albumId = ?;',[req.params.albumId]).then(results => {
        res.json({ albums: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
      /*let user = users2.getAllUsers()
      res.json({user});*/
});

router
.route('/returnAlbumId/:bandId')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT albumId FROM albums where bandId = ?;',[req.params.bandId]).then(results => {
        res.json({ albums: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
      /*let user = users2.getAllUsers()
      res.json({user});*/
});

router
.route('/searchByName/:albumName')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM albums where albumName = ?;',[req.params.albumName]).then(results => {
        res.json({ albums: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
      /*let user = users2.getAllUsers()
      res.json({user});*/
});

router
  .route('/:bandId/createalbum')
  .post(
      //bands need to be authenticated in order to post albums
      //passport.authenticate('jwt', { session: false }),
      (req, res) => 
      {
        //check field filling
        if(req.body.albumName && req.body.albumLaunchDate && req.body.albumPicture && req.body.albumGenre)
        {   
            //create album if all fields are filled
            db.query('INSERT INTO albums (bandId, albumName, albumLaunchDate, albumPicture, albumGenre)VALUES(?,?,?,?,?);',[req.params.bandId, req.body.albumName, req.body.albumLaunchDate, req.body.albumPicture, req.body.albumGenre]);
            //send created status
            res.sendStatus(201);
        }
        else
        {  
            //bad request
            res.sendStatus(400);
        }
    });

router
.route('/modify/:albumId')
.put(
    //bands need to be logged in to modify their albums
    passport.authenticate('jwt', { session: false }),
    (req,res) => 
    {   
        db.query('SELECT albumId FROM albums WHERE albumId = ?;', [req.params.albumId]).then(results => 
        {
                //check for results
                if (results.length)
                {
                    //check field filling
                    if(req.body.albumName && req.body.albumLaunchDate && req.body.albumPicture && req.body.albumGenre)
                    {
                        //modify album data
                        db.query('UPDATE albums SET albumName = ?,albumLaunchDate = ?,albumPicture = ?,albumGenre = ? WHERE albumId = ?',[req.body.albumName,req.body.albumLaunchDate,req.body.albumPicture,req.body.albumGenre,req.params.albumId]);
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
                    //album id not found, cannot be modified
                    res.sendStatus(404);
                }
        });
});

router
.route('/delete/:albumId')
.delete(
    //bands need to be logged in to delete their albums
    passport.authenticate('jwt', { session: false }),
    (req, res) => 
    {
        //check if the id exists in the database first
        //we need to send not found response if id is not found
        db.query('SELECT albumId FROM albums WHERE albumId = ?;', [req.params.albumId]).then(results => 
        {
            //check for results
            if (results.length)
            {
                //delete found album
                db.query('DELETE FROM albums WHERE albumId = ?',[req.params.albumId]);
                //deincrement the album id field
                db.query('ALTER TABLE albums AUTO_INCREMENT=?',[(req.params.albumId - 1)]); 
                //send ok status
                res.sendStatus(200);
            }
            else
            {
                //album id not found, cannot be deleted
                res.sendStatus(404);
            }
        });
})

module.exports = router;