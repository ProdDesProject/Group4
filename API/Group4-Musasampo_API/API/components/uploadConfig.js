const multer = require('multer');

// Storage settings
const storageSettings = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});

//Only .JPEG, .JPG and .PNG should be accepted
function checkFileType(req, file, callback) {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(new Error('File type is not valid. Only .JPEG, .JPG and .PNG are accepted.'))
    }
}

// Creating and exporting an multer-object, which uses the configuration above
const multerUpload = multer({
    storage: storageSettings,
    fileFilter: checkFileType
});
module.exports = multerUpload;