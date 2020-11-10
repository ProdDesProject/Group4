const express = require('express');
const parseobj = require('xml2js');


let router = express.Router();
const db = require('./db.js');

const passport = require('passport');
const { render } = require('ejs');
const BasicStrategy = require('passport-http').BasicStrategy;

/*let AlbumsData = [
    {
        bandId: "2",
        albumId: "1",
        albumName: "Show No Mercy",
        albumLaunchDate: "1983-12-03",
        albumPicture: "shownomercy.png",
        albumGenre: "Thrash Metal"
    }

  ];*/
  
  /*
  let AlbumObject = {
        "bandId": "2",
        "albumId": "1",
        "albumName": "Show No Mercy",
        "albumLaunchDate": "1983-12-03",
        "albumPicture": "shownomercy.png",
        "albumGenre": "Thrash Metal"
  };*/

router
.route('')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM albums;').then(results => {
        res.json({ albums: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
    /*let user = users2.getAllUsers()
    res.json({user});*/
});

router
.route(':albumId')
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
  .route('/createalbum')
  .post(
      //bands need to be authenticated in order to post albums
      //passport.authenticate('basic', { session: false }),
      (req, res) => 
      {
        //check field filling
        if(req.body.albumName && req.body.albumLaunchDate && req.body.albumPicture && req.body.albumGenre)
        {    //create album if all fields are filled
            db.query('INSERT INTO albums (albumName,albumLaunchDate,albumPicture,albumGenre)VALUES(?,?,?,?);',[req.body.albumName, req.body.albumLaunchDate, req.body.albumPicture, req.body.albumGenre]);
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
    //passport.authenticate('basic', { session: false }),
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
    //passport.authenticate('basic', { session: false }),
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

/*module.exports = 
{
    router:router
};*/

module.exports = router;