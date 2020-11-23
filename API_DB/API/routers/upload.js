//import asd from "../uploads/music"
//const path = require('path');

const fs = require('fs');
const express = require('express');
const multer  = require('multer')
const multerUpload = multer({ dest: '../uploads/pictures/' })
const router = express.Router();
const path = require('path');
const musicpath = '../uploads/music';
const imagepath = '../uploads/pictures';
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

router.get('/Hurt-test', (req, res) => {
  var results = "../uploads/music/Hurt.mp3"
  res.json({ source: results});
})

//works
router.get('/imagepath.png/:image', function (req, res) {
  res.sendFile(path.join(__dirname, imagepath, req.params.image));
});

router.get('/mp3path.mp3/:song', function (req, res) {
  res.sendFile(path.join(__dirname, musicpath, req.params.song));
  console.log();
});



//works
router.post('/mp3byfile', multerUpload.single('testFile'), (req, res) => {
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
router.post('/picturebyfile', multerUpload.single('testFile'), (req, res) => {
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