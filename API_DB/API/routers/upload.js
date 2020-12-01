const path = require('path');

const fs = require('fs');
const express = require('express');
const multer  = require('multer');

const multerUpload = multer({ dest: 'uploads/pictures/' });
const multerUpload1 = multer({ dest: 'uploads/music/' });
const multerUpload2 = multer({ dest: 'uploads/pictures/' });

var mkdirp = require('mkdirp');

const router = express.Router();
const { checkServerIdentity } = require('tls');

var musicpath = '../uploads/music/';
var imagepath = '../uploads/pictures/';

var musicpath2 = '../uploads/music/Pyry Viirret - Classics covered';
var imagepath2 = '../uploads/pictures/Pyry Viirret - Classics covered pictures';
var multerdes;

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
router.post('/createFoldersForUpload', function (req, res) {

  //Res.bandObject Example:
  var bandObj = {
    bandName: req.body.bandName,
    bandLogo: req.body.bandLogo,
  };
  //Res.albumObject Example:
  var albumObj = {
    bandName: req.body.bandName,
    albumName: req.body.albumName,
    albumPicture: req.body.albumPicture,
  };
  //Res.songObject Example:
  var songObj = {
    bandName: req.body.bandName,
    albumName: req.body.albumName,
    songName: req.body.songName,
    MP3:req.body.MP3
  };

  async function createFolders(name)
    {
      if (name === "bands")
      {
         //Paths for creating folders:
        let path = "./uploads/"+req.body.bandName;
        let path1 = "./uploads/"+req.body.bandName+"/music"
        let path2 = "./uploads/"+req.body.bandName+"/pictures"
      
        //Create folder by bandName and inside music and pictures:
        await fs.mkdirSync(path, { recursive: true });
        await fs.mkdirSync(path1, { recursive: true });
        await fs.mkdirSync(path2, { recursive: true });
      }

      if (name === "albums")
      {
        //Paths for creating folders:
        let path = "./uploads/"+req.body.bandName+"/music/"+req.body.albumName;
        //console.log(path);
        //Create folder by bandName and inside music and pictures:
        await fs.mkdirSync(path, { recursive: true });
      }
     
    }

  if (bandObj.bandName != undefined && bandObj.bandLogo != undefined)
  {
    
    console.log("bandObj");
    let testjpg = req.body.bandLogo;
    //need to get path in req, then it needs to verify it can be done -> if route true -> change multerUpload des. for creating new album, etc
    if(!(fileNameTesting(testjpg, fileTypes[0]) ||  fileNameTesting(testjpg, fileTypes[1]) || fileNameTesting(testjpg, fileTypes[2]) || fileNameTesting(testjpg, fileTypes[3])))
    {
      res.sendStatus(405);
    }else
    {
      console.log("meni läpi");
      createFolders("bands");
      res.sendStatus(200);
    }
  }

    if (albumObj.albumName != undefined)
    {
    console.log("albumObj");
    let testjpg = req.body.albumPicture;
    //need to get path in req, then it needs to verify it can be done -> if route true -> change multerUpload des. for creating new album, etc
    if(!(fileNameTesting(testjpg, fileTypes[0]) ||  fileNameTesting(testjpg, fileTypes[1]) || fileNameTesting(testjpg, fileTypes[2]) || fileNameTesting(testjpg, fileTypes[3])))
    {
      res.sendStatus(405);
    }else
    {
      console.log("meni läpi");
      createFolders("albums");
      res.sendStatus(200);
    }
  }

  if (songObj.songName != undefined)
  {
    console.log("songObj");
    let testmp3 = req.body.MP3;
    //need to get path in req, then it needs to verify it can be done -> if route true -> change multerUpload des. for creating new album, etc
    if(!(fileNameTesting(testmp3, fileTypes[0]) ||  fileNameTesting(testmp3, fileTypes[1]) || fileNameTesting(testmp3, fileTypes[2]) || fileNameTesting(testmp3, fileTypes[3])))
    {
      res.sendStatus(405);
    }else
    {
      //let path = "./uploads/bands/"+req.body.bandName+"/"+req.body.albumName+"/";
      res.sendStatus(200);
    }
  }
 
});


//works
router.post('/mp3byfile', multerUpload1.single('testFile'), (req, res) => {
  console.log("req.file:"+ req.file);
  
  /**
   * Need to get bandName and albumname here as an object and get it down below for fs.rename!!!
   **/

  fs.rename(req.file.path, './uploads/' + req.file.bandName +'/music/'+ req.file.albumName +'/'+ req.file.originalname, function (err) {
    if (err) throw err;
    console.log('renamed complete');
    res.send("Test");
  });
  
});


//works
router.post('/picturebyfile', multerUpload2.single('testFile'), (req, res) => {
  console.log("req.file:"+ req.file);
  
  /**
   * Need to get bandName and albumname here as an object and get it down below for fs.rename!!!
   **/

  fs.rename(req.file.path, './uploads/pictures/' + req.file.originalname, function (err) {
    if (err) throw err;
    console.log('renamed complete');
    res.send("Test");
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