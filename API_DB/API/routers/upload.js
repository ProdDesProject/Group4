//const path = require('path');

const fs = require('fs');
const express = require('express');
const multer  = require('multer');

const multerUpload = multer({ dest: 'uploads/pictures/' });
const multerUpload1 = multer({ dest: 'uploads/music/' });
const multerUpload2 = multer({ dest: 'uploads/pictures/' });

var multerdes = "";
var customMulterUpload = multer({des: multerdes});

const router = express.Router();
const path = require('path');
const { checkServerIdentity } = require('tls');

var musicpath = '../uploads/music/';
var imagepath = '../uploads/pictures/';

var musicpath2 = '../uploads/music/Pyry Viirret - Classics covered';
var imagepath2 = '../uploads/pictures/Pyry Viirret - Classics covered pictures';

const fileTypes = ["jpg", "jpeg", "bmp", "png"];

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
  console.log(extension);

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

/*router.get('/Hurt-test', (req, res) => {
  var results = "../uploads/music/Hurt.mp3"
  res.json({ source: results});
})*/

//works
router.get('/imagepath.png/:band/:image', function (req, res) {
  res.sendFile(path.join(__dirname, imagepath, req.params.band, req.params.image));
});

router.get('/mp3path.mp3/:band/:song', function (req, res) {
  res.sendFile(path.join(__dirname, musicpath, req.params.band, req.params.song));
  console.log();
});

//works
router.get('/imagepath.png/:image', function (req, res) {
  res.sendFile(path.join(__dirname, imagepath2, req.params.image));
});

router.get('/mp3path.mp3/:song', function (req, res) {
  res.sendFile(path.join(__dirname, musicpath2, req.params.song));
  console.log();
});

//POST-method for checking uploading information and filenametesting
router.post('/uploadfileinfo', function (req, res) {
  
  console.log("req"+ req);

  //Res.bandObject Example:
  var bandObj = {
    bandName: req.body.bandName,
    bandLogo: req.body.bandLogo,
    
  };
  //Res.albumObject Example:
  var albumObj = {
    albumName: req.body.albumName,
    albumPicture: req.body.albumPicture,
  };
  //Res.songObject Example:
  var songObj = {
    songName: req.body.songName,
    MP3:req.body.MP3
  };

  //let jpg_or_mp3 = req.body.jpg;

  if (bandObj != undefined)
  {
    let testjpg = req.body.bandLogo;
    //need to get path in req, then it needs to verify it can be done -> if route true -> change multerUpload des. for creating new album, etc
    if(!(fileNameTesting(testjpg, fileTypes[0]) ||  fileNameTesting(testjpg, fileTypes[1]) || fileNameTesting(testjpg, fileTypes[2]) || fileNameTesting(testjpg, fileTypes[3])))
    {
      multerdes = "uploads/pictures/"+req.body.bandName+"/"+req.body.bandLogo+"/";
      console.log(multerdes);
      res.sendStatus(405);
    }else
    {
      res.sendStatus(200);
    }
  }

  if (albumObj != undefined)
  {
    let testjpg = req.body.albumPicture;
    //need to get path in req, then it needs to verify it can be done -> if route true -> change multerUpload des. for creating new album, etc
    if(!(fileNameTesting(testjpg, fileTypes[0]) ||  fileNameTesting(testjpg, fileTypes[1]) || fileNameTesting(testjpg, fileTypes[2]) || fileNameTesting(testjpg, fileTypes[3])))
    {
      multerdes = "uploads/pictures/"+req.body.albumName+"/"+req.body.albumPicture+"/";
      console.log(multerdes);
      res.sendStatus(405);
    }else
    {
      res.sendStatus(200);
    }
  }

  if (songObj != undefined)
  {
    let testmp3 = req.body.MP3;
    //need to get path in req, then it needs to verify it can be done -> if route true -> change multerUpload des. for creating new album, etc
    if(!(fileNameTesting(testmp3, fileTypes[0]) ||  fileNameTesting(testmp3, fileTypes[1]) || fileNameTesting(testmp3, fileTypes[2]) || fileNameTesting(testmp3, fileTypes[3])))
    {
      multerdes = "uploads/music/"+req.body.songName+"/"+req.body.MP3;
      console.log(multerdes);
      res.sendStatus(405);
    }else
    {
      res.sendStatus(200);
    }
  }
 
});


//works
router.post('/mp3byfile', multerUpload1.single('testFile'), (req, res) => {
  console.log("req.file:"+ req.file);
  //var re = /(\.mp3)$/i;
  //if(!re.exec(req.file.originalname))
  if(!fileNameTesting(req.file.originalname, "mp3"))
  {
    res.sendStatus(405);
  }
  else {
    fs.rename(req.file.path, './uploads/music/' + req.file.originalname, function (err) {
      if (err) throw err;
      console.log('renamed complete');
      res.send("Test");
    });
  }
});


//works
router.post('/picturebyfile', multerUpload2.single('testFile'), (req, res) => {


  console.log("req.file:"+ req.file);
  if(!(fileNameTesting(req.file.originalname, fileTypes[0]) ||  fileNameTesting(req.file.originalname, fileTypes[1]) || fileNameTesting(req.file.originalname, fileTypes[2]) || fileNameTesting(req.file.originalname, fileTypes[3])))
  {
    res.sendStatus(405);
  }
  else {
    fs.rename(req.file.path, './uploads/pictures/' + req.file.originalname, function (err) {
      if (err) throw err;
      console.log('renamed complete');
      res.send("Test");
    });
  }
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