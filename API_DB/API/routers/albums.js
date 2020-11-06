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
      //passport.authenticate('basic', { session: false }),
      (req, res) => {
        db.query('INSERT INTO albums (albumName,albumLaunchDate,albumPicture,albumGenre)VALUES(?,?,?,?);',[req.body.albumName, req.body.albumLaunchDate, req.body.albumPicture, req.body.albumGenre]);
        //const hashedPassword = bcrypt.hashSync(req.body.password, 6);
        res.sendStatus(201);
    });

router
.route('/:albumId')
.put(
    //passport.authenticate('basic', { session: false }),
    (req,res) => { 
    db.query('UPDATE albums SET albumName = ?,albumLaunchDate = ?,albumPicture = ?,albumGenre = ? WHERE albumId = ?'
    ,[req.body.albumName,req.body.albumLaunchDate,req.body.albumPicture,req.body.albumGenre,req.params.albumId]);
    res.sendStatus(201);
})

router
.route('/delete/:albumId')
.delete(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
        db.query('DELETE FROM albums WHERE albumId = ?',[req.params.albumId]);
        /*let Itemid = req.params;
        console.log(Itemid.id);
        console.log(ItemsData[Itemid.id]);
        ItemsData.splice(Itemid.id,ItemsData.length);
        console.log(ItemsData);*/
        res.sendStatus(200);
    })

/*module.exports = 
{
    router:router
};*/

module.exports = router;