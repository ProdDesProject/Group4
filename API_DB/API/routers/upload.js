const path = require('path');

const fs = require('fs');
const express = require('express');
const multer  = require('multer');

const multerUpload = multer({ dest: './uploads/' });
var mkdirp = require('mkdirp');

const router = express.Router();
const { checkServerIdentity } = require('tls');

var basicPath = '../uploads/bands/';
var userPath = '../uploads/Users/';
var errorPath = '../uploads/pictures/nopic.png';

const fileTypes = ["jpg", "jpeg", "bmp", "png", "mp3"];

//
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
//JWT authentication
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecretKey = require('../jwt-key.json');
//

//filename testing function
function fileNameTesting(fileName, fileExtension)
{
  //if the file name is undefined
  if(fileName == undefined)
  {
    return false;
  }

  //filter out any character except for dots, digits or latin letters
  var regEx = /[^A-Za-z0-9.]+/;

  console.log(`Test ${fileName}:`+regEx.test(fileName));

  if(regEx.test(fileName))
  {
    return false;
  }

  //split the fileName with the . separator
  const splittedName = fileName.split(".");

  //more than 1 dot is not allowed in fileName
  if(!(splittedName.length === 2))
  {
    console.log("Too many dots");
    return false;
  }

  //get the file extension
  const extension = splittedName[splittedName.length - 1];
  console.log("extension:"+extension);

  //check if file extension corresponds
  if(!(extension === fileExtension))
  {
    return false;
  }

  return true;
}

router.get('/', (req, res) => {
    res.send("Only POST method accepted with multipart file");
})

//GET-method: User-picture:
router.get('/userpicture/:username/:pic', function (req, res) {
  res.sendFile(path.join(__dirname, userPath, req.params.username, req.params.pic));
  console.log();
});

//GET-method: User-picture:
router.get('/errorpicture', function (req, res) {
  res.sendFile(path.join(__dirname, errorPath));
  console.log();
});

//GET-method: MP3 UPDATED:
router.get('/mp3path.mp3/:bandName/:albumName/:song', function (req, res) {
  res.sendFile(path.join(__dirname, basicPath, req.params.bandName,'albums',req.params.albumName, req.params.song));
  console.log();
});

//GET-method for BandPicture:
router.get('/imagepath.png/:bandName/:image', function (req, res) {
  console.log(req.params.bandName);
  //console.log(req.params.albumName);
  console.log(req.params.image);
  
  res.sendFile(path.join(__dirname, basicPath, req.params.bandName, req.params.image),function err(){
    if (err) {
      console.log(err);
      res.sendFile(path.join(__dirname, errorPath));
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

//USED in search and shop-pages:
//GET-method: BANDS/ALBUM/ route to albumImage;
router.get('/imagepath.png/:band/albums/:albumName/:image', function (req, res) 
{
  console.log(req.params.band);
  console.log(req.params.albumName);
  console.log(req.params.image);
 
  res.sendFile(path.join(__dirname, basicPath,req.params.band,"albums",req.params.albumName,req.params.image),function err(){
    if (err) {
      console.log(err);
      res.sendFile(path.join(__dirname, errorPath));
    }
    else {
      console.log('Sent:', fileName);
    }
  });
  
  
});

//POST-method for checking uploading information and filenametesting
router.post('/checkData', function (req, res) {

  var data = req.body.data;

  console.log("req.body:"+req.body.data);

  //need to get path in req, then it needs to verify it can be done -> if route true -> change multerUpload des. for creating new album, etc
  if(!(fileNameTesting(data, fileTypes[0]) ||  fileNameTesting(data, fileTypes[1]) || fileNameTesting(data, fileTypes[2]) || fileNameTesting(data, fileTypes[3]) || fileNameTesting(data, fileTypes[4])))
  {
    console.log("405");
    res.send("405");
  }else
  {
    console.log("200");
    res.send("200");
  }
 
});

//POST-method for creating folders for uploading images and music:
router.post('/createFoldersForUpload', function (req, res) {

  async function createFolders(name)
    {
      if (name === "bands")
      {
         //Paths for creating folders:
        let path = "./uploads/bands/"+req.body.bandName+"/albums";
        //let path1 = "./uploads/"+req.body.bandName+"/music"
        //let path2 = "./uploads/"+req.body.bandName+"/pictures"
      
        //Create folder by bandName and inside music and pictures:
        await fs.mkdirSync(path, { recursive: true });
        //await fs.mkdirSync(path1, { recursive: true });
        //await fs.mkdirSync(path2, { recursive: true });
      }

      if (name === "albums")
      {
        //Paths for creating folders:
        let path = "./uploads/bands/"+req.body.bandName+"/albums/"+req.body.albumName;

        //Create folder by bandName and albumName and inside music and pictures:
        await fs.mkdirSync(path, { recursive: true });
      }
     
    }

  //Res.bandObject Example:
  var bandObj = {
    bandName: req.body.bandName,
  };
  //Res.albumObject Example:
  var albumObj = {
    bandName: req.body.bandName,
    albumName: req.body.albumName,
  };

  if (bandObj.bandName !== undefined && albumObj.albumName === undefined)
  {
    console.log("bandObj");
    createFolders("bands");
    res.send("200");
  }

  if (albumObj.albumName !== undefined && bandObj.bandName !== undefined)
  {
    console.log("albumObj");
    createFolders("albums");
    res.send("200");
  }
 
});


//works
router.post('/uploadmp3/:bandName/:albumName', multerUpload.single('testFile'), (req, res) => {
  console.log("req.file:"+ req.file);
  
  var bandName = req.params.bandName;
  var albumName = req.params.albumName;

  console.log("router.post('/uploadmp3/:bandName/:albumName")
  console.log("bandName:"+bandName);
  console.log("albumName"+albumName);

  fs.rename(req.file.path, './uploads/bands/' + bandName +'/albums/'+ albumName +'/'+ req.file.originalname, function (err) {
    if (err) throw err;
    console.log('renamed complete');
    res.sendStatus(204);
  });
  
});


//works
router.post('/uploadbandpic/:bandName', multerUpload.single('testFile'), (req, res) => {
  console.log("req.file:"+ req.file);

  var bandName = req.params.bandName;

  console.log("/uploadbandpic/:bandName");
  console.log("bandName:"+bandName);

  console.log("req.file.path:"+req.file.path);

  fs.rename(req.file.path, './uploads/bands/'+ bandName + '/' + req.file.originalname, function (err) 
  {
    if (err) 
      throw err;
    console.log('renamed complete');
    //successful
    res.sendStatus(204);
  });
  
});

//Add a new picture for album, need params for bandName and albumname:
router.post('/addAlbumPicture/:bandName/:albumName', multerUpload.single('testFile'), (req, res) => {
  console.log("req.file:"+ req.file);

  var bandName = req.params.bandName;
  var albumName = req.params.albumName;

     //if albumPicture
  fs.rename(req.file.path, './uploads/bands/'+ bandName+ '/albums/' + albumName + '/' + req.file.originalname, function (err) {
    if (err) throw err;
    console.log('renamed complete');
    //successful
    res.sendStatus(204);
  });

});

/**
 * Work
 */
router.post('/multiple', multerUpload.array('testFiles', 4), (req, res) => {
  console.log(req.files);

  req.files.forEach(f => {
    fs.renameSync(f.path, './uploads/pictures/' + f.originalname)
  })

  res.send("Completed");
  
  fs.rename(req.file.path, './uploads/pictures/' + req.file.originalname, function (err) {
      if (err) throw err;
      console.log('renamed complete');
      res.send("Test");
    });    

});

module.exports = router;