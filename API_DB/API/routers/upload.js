//import asd from "../uploads/music"

const fs = require('fs');
const express = require('express');
const multer  = require('multer')
const multerUpload = multer({ dest: '../uploads/pictures/' })
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.send("Only POST method accepted with multipart file");
})

router.get('/Hurt-test', (req, res) => {
  var results = "../uploads/music/Hurt.mp3"
  res.json({ source: results});
})-

//works
router.get('/imagepath.png', function (req, res) {
  res.sendFile(path.join(__dirname, '../uploads/pictures', 'bandpic1.png'));
});

router.get('/mp3path.mp3', function (req, res) {
  res.sendFile(path.join(__dirname, '../uploads/music', 'Hurt.mp3'));
});



//works
router.post('/mp3byfile', multerUpload.single('testFile'), (req, res) => {
  console.log("req.file:"+ req.file);

  fs.rename(req.file.path, './uploads/music/' + req.file.originalname, function (err) {
      if (err) throw err;
      console.log('renamed complete');
      res.send("Test");
    });
});

//works
router.post('/picturebyfile', multerUpload.single('testFile'), (req, res) => {
    console.log("req.file:"+ req.file);

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