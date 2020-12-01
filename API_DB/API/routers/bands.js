const express = require('express');
const parseobj = require('xml2js');

let router = express.Router();

const db = require('./db.js');
const passport = require('passport');
const { render } = require('ejs');
const BasicStrategy = require('passport-http').BasicStrategy;

/*let BandsData = [
    {
        bandId: "0",
        nsfw: true,
        bandName: "Slayer",
        country: "USA",
        bandlogo: "Slayer.png"
    }
  ];*/
  
  /*
  let BandObject = {
        "bandId": "0",
        "nsfw": true,
        "bandName": "Slayer",
        "country": "USA",
        "bandLogo": "Slayer.png"
  };*/


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
      /*let user = users2.getAllUsers()
      res.json({user});*/
});

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
      /*let user = users2.getAllUsers()
      res.json({user});*/
});


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
      /*let user = users2.getAllUsers()
      res.json({user});*/
});

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


router
    .route('/createband/:userId')
    .post(
        //only authenticated users can create bands
        passport.authenticate('jwt', { session: false }),
        (req, res) => 
        {
            async function getUser(req)
            {
                var req2 = req;
                var UserId = req2.params.userId;

                await db.query('INSERT INTO bands(nsfw,bandName,bandLogo,country)VALUES(?,?,?,?);',[req2.body.nsfw, req2.body.bandName, req2.body.bandLogo, req2.body.country]);
    
                console.log("req2:" + req2.body.nsfw, req2.body.bandName, req2.body.bandLogo, req2.body.country);
                
                var bandId = await db.query('SELECT bandId FROM bands WHERE bandName = ?;',[req2.body.bandName]);
                console.log(bandId[0].bandId);

                db.query('INSERT INTO users_bands(bandId, userId)VALUES(?,?);',[bandId[0].bandId, UserId]);
            }

            console.log("userid:" + req.params.userId);

            //check field filling
            if(!req.body.nsfw || !req.body.bandName || !req.body.bandLogo || !req.body.country)
            {
                //fields not filled, bad request
                res.sendStatus(400);
            }
            else
            {
                //create band if all fields are filled
                getUser(req);

               

                res.sendStatus(201);
            }
        });

//modify a band's information based on id
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
