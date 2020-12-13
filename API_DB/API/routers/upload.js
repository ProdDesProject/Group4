const path = require('path');

const fs = require('fs');
const express = require('express');
const multer  = require('multer');

const multerUpload = multer({ dest: 'uploads/pictures/' });
const multerUpload1 = multer({ dest: 'uploads/music/' });
const multerUpload2 = multer({ dest: 'uploads/pictures/' });

const multerUploadBands = multer({ dest: 'uploads/bands/' });



var mkdirp = require('mkdirp');

const router = express.Router();
const { checkServerIdentity } = require('tls');

var basicPath = '../uploads/bands/';
var musicpath = '../uploads/bands/';
var imagePathBands = '../uploads/bands/';

var musicpath2 = '../uploads/music/Pyry Viirret - Classics covered';
var imagepath2 = '../uploads/pictures/Pyry Viirret - Classics covered pictures';
var multerdes;

const fileTypes = ["jpg", "jpeg", "bmp", "png", "mp3"];

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

//GET-method: MP3 UPDATED:
router.get('/mp3path.mp3/:bandName/:albumName/:song', function (req, res) {
  res.sendFile(path.join(__dirname, basicPath, req.params.bandName,'albums',req.params.albumName, req.params.song));
  console.log();
});

//GET-method for BandPicture:
router.get('/imagepath.png/:bandName/:image', function (req, res) {
  res.sendFile(path.join(__dirname, basicPath, req.params.bandName, req.params.image));
});

//USED in search and shop-pages:
//GET-method: BANDS/ALBUM/ route to albumImage;
router.get('/imagepath.png/:band/albums/:image', function (req, res) 
{
  console.log(req.params.band);
  console.log(req.params.image);
  res.sendFile(path.join(__dirname, basicPath,req.params.band,"albums",req.params.image));
});

//POST-method for checking uploading information and filenametesting
//TESTED AND WORKS ON POSTMAN:
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

//POST-method for creating folders for uploading images and music, Needs to make routing and folders ready before upload!!:
//TESTED AND WORKD ON POSTMAN
router.post('/createFoldersForUpload', function (req, res) {

  async function createFolders(name)
    {
      if (name === "bands")
      {
         //Paths for creating folders:
        var path = "./uploads/bands/"+req.body.bandName;
        var path2 = "./uploads/bands/"+req.body.bandName+"/albums"
      
        //Create folder by bandName and inside music and pictures:
        fs.mkdirSync(path, { recursive: true });
        fs.mkdirSync(path2, { recursive: true });
      }

      if (name === "albums")
      {
        console.log("albums");
        console.log(req.body.bandName+req.body.albumName);
        //Paths for creating folders:
        var path = "./uploads/bands/"+req.body.bandName+"/albums/"+req.body.albumName;

        //Create folder by bandName and inside music and pictures:
        fs.mkdirSync(path, { recursive: true });
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

  if (req.body.bandName != undefined && req.body.albumName == undefined)
  {
    console.log("bandObj");
    createFolders("bands");
    res.send("200");
  }

  if (req.body.bandName != undefined && req.body.albumName != undefined)
  {
    console.log("albumObj");
    createFolders("albums");
    res.send("200");
  }
 
});

//Add a new mp3-file for music in albums, need params for bandName and AlbumName:
//WORKS ON POSTMAN:
router.post('/mp3byfile/:bandName/:albumName', multerUploadBands.single('testFile'), (req, res) => {
  console.log("req.file:"+ req.file);
  
  var bandName = req.params.bandName;
  var albumName = req.params.albumName;

  fs.rename(req.file.path, './uploads/bands/' + bandName +'/albums/'+ albumName +'/'+ req.file.originalname, function (err) {
    if (err) throw err;
    console.log('renamed complete');
    res.send("Test");
  });
  
});

//Add a new picture for Band, need params for bandname:
//WORKS ON POSTMAN:
router.post('/addBandPicture/:bandName/', multerUploadBands.single('testFile'), (req, res) => {
  console.log("req.file:"+ req.file);

  var bandName = req.params.bandName;

   //if bandPicture
  fs.rename(req.file.path, './uploads/bands/'+ bandName + '/' + req.file.originalname, function (err) {
    if (err) throw err;
    console.log('renamed complete');
    res.send("Test");
  });

});

//Add a new picture for album, need params for bandName and albumname:
//WORKS ON POSTMAN
router.post('/addAlbumPicture/:bandName/:albumName', multerUploadBands.single('testFile'), (req, res) => {
  console.log("req.file:"+ req.file);

  var bandName = req.params.bandName;
  var albumName = req.params.albumName;

     //if albumPicture
  fs.rename(req.file.path, './uploads/bands/'+ bandName+ '/albums/' + albumName + '/' + req.file.originalname, function (err) {
    if (err) throw err;
    console.log('renamed complete');
    res.send("Test");
  });

});

/**
 * Not in use now
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