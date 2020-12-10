const express = require('express');
const parseobj = require('xml2js');

let router = express.Router();

const db = require('./db.js');
const passport = require('passport');
const { render } = require('ejs');
const BasicStrategy = require('passport-http').BasicStrategy;

//Array of Bands Example:
let BandsData = [
    {
        bandId: "0",
        nsfw: true,
        bandName: "Slayer",
        country: "USA",
        bandlogo: "Slayer.png"
    }
];
  
//Object of band Example:
let BandObject = {
    "bandId": "0",
    "nsfw": true,
    "bandName": "Slayer",
    "country": "USA",
    "bandLogo": "Slayer.png"
};

//GET-method for getting all bands:
router
.route('')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM bands;').then(results => {
        res.json({ bands: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
});

//GET-method for getting band by bandId:
router
.route('/:bandId')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM bands where bandId = ?;',[req.params.bandId]).then(results => 
    {
        res.json(results);
    })
    .catch(() => 
    {
        res.sendStatus(500);
    })
});

//GET-method for search by userId:
router
.route('/searchByUserId/:userId')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM bands where userId = ?;',[req.params.userId]).then(results => 
    {
        res.json({ bands: results})
    })
    .catch(() => 
    {
        res.sendStatus(500);
    })
});

//GET-method for search by bandName:
router
.route('/searchByName/:bandName')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM bands where bandName = ?;',[req.params.bandName]).then(results => 
    {
        res.json({ bands: results})
    })
    .catch(() => 
    {
        res.sendStatus(500);
    })
});

//POST-method for creating a new band:
router
  .route('/createband2')
  .post(
      //only authenticated users can create bands
      passport.authenticate('jwt', { session: false }),
      (req, res) => 
      {
        //check field filling
        if(!req.body.userId || !req.body.nsfw == null || !req.body.bandName || !req.body.bandLogo || !req.body.country)
        {
            //fields not filled, bad request
            res.sendStatus(400);
        }
        else
        {
            //create band if all fields are filled
            db.query('INSERT INTO bands(userId,nsfw,bandName,bandLogo,country)VALUES(?,?,?,?,?);',[req.body.userId,req.body.nsfw, req.body.bandName, req.body.bandLogo, req.body.country]);
            res.sendStatus(201);
        }
      });

//POST-method for creating a new band by userId:
router
    .route('/createband/:userId')
    .post(
        //only authenticated users can create bands
        passport.authenticate('jwt', { session: false }),
        (req, res) => 
        {
            //check field filling
            if(req.body.nsfw === undefined || !req.body.bandName || !req.body.bandLogo || !req.body.country)
            {
                //fields not filled, bad request
                res.sendStatus(400);
            }
            else
            {
                //create band if all fields are filled
                db.query("INSERT INTO bands (userId, nsfw, bandName, bandLogo, country) VALUES (?,?,?,?,?);" ,[req.params.userId, req.body.nsfw, req.body.bandName, req.body.bandLogo, req.body.country]);
                //send status created
                res.sendStatus(201);
            }
        });

//PUT-method for modifying a band's information by bandId:
router
.route('/modify/:bandId')
.put(
    //check authentication
    passport.authenticate('jwt', { session: false }),
    (req,res) => 
    {
        //check if the id exists in the database first
        //we need to send not found response if id is not found
        db.query('SELECT bandId FROM bands WHERE bandId = ?;', [req.params.bandId]).then(results => 
        {
                //check for results
                if (results.length)
                {
                    //check field filling
                    if(req.body.bandName && req.body.bandLogo && req.body.country)
                    {
                        //band id found, modify band credentials from the database
                        db.query('UPDATE bands SET nsfw = ?,bandName = ?,bandLogo = ?,country = ? WHERE bandId = ?' ,[req.body.nsfw,req.body.bandName,req.body.bandLogo,req.body.country,req.params.bandId]);
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
                    //band id not found, cannot be modified
                    res.sendStatus(404);
                }
        });
    });

//DELETE-method for deleting band by BandId:
router
.route('/delete/:bandId')
.delete(
    //check authentication
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        //check if the id exists in the database first
        //we need to send not found response if id is not found
        db.query('SELECT bandId FROM bands WHERE bandId = ?;', [req.params.bandId]).then(results => 
            {
                //check for results
                if (results.length)
                {
                    //band id found, delete band from the database
                    db.query('DELETE FROM bands WHERE bandId = ?',[req.params.bandId]);
                    //deincrement the band id field
                    db.query('ALTER TABLE bands AUTO_INCREMENT = ?',[(req.params.bandId - 1)]); 
                    //send ok status
                    res.sendStatus(200);
                }
                else
                {
                    //band id not found, cannot be deleted
                    res.sendStatus(404);
                }
            });
    })

module.exports = router;
