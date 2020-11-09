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
        res.json({ bands2: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
      /*let user = users2.getAllUsers()
      res.json({user});*/
});

router
.route(':bandId')
.get(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
    db.query('SELECT * FROM bands where bandId = ?;',[req.params.bandId]).then(results => {
        res.json({ band: results})
    })
    .catch(() => {
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
    db.query('SELECT * FROM bands where bandName = ?;',[req.params.bandName]).then(results => {
        res.json({ bands: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })
      /*let user = users2.getAllUsers()
      res.json({user});*/
});

router
  .route('/createband')
  .post(
      //passport.authenticate('basic', { session: false }),
      (req, res) => {
        db.query('INSERT INTO bands (nsfw,bandName,bandLogo,country)VALUES(?,?,?,?);',[req.body.nsfw, req.body.bandName, req.body.bandLogo, req.body.country]);
        //const hashedPassword = bcrypt.hashSync(req.body.password, 6);
        res.sendStatus(201);
    });

router
.route('/:bandId')
.put(
    //passport.authenticate('basic', { session: false }),
    (req,res) => {
    db.query('UPDATE bands SET nsfw = ?,bandName = ?,bandLogo = ?,country = ? WHERE bandId = ?'
    ,[req.body.nsfw,req.body.bandName,req.body.bandLogo,req.body.country,req.params.bandId]);
    res.sendStatus(201);

    /*BandsData[Bandid.bandId] = {
        bandId: Bandid.bandId,
        bandName: req.body.bandName, 
        bandLogo: req.body.bandLogo, 
        country: req.body.country
    }

    res.send(BandsData[Bandid.bandId]);*/
})   

router
.route('/delete/:bandId')
.delete(
    //passport.authenticate('basic', { session: false }),
    (req, res) => {
        db.query('DELETE FROM bands WHERE bandId = ?',[req.params.bandId]);
        /*let Itemid = req.params;
        console.log(Itemid.id);
        console.log(ItemsData[Itemid.id]);
        ItemsData.splice(Itemid.id,ItemsData.length);
        console.log(ItemsData);*/
        res.sendStatus(200);
    })

//export the router 
/*module.exports = 
{
    router:router
}*/

module.exports = router;
