const multer = require('multer');
const path = require('path');

const optionProfil = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './../files/profil/'))
  },
  filename: (req, file, callback) => {

    const name = 'profil'+Date.now() + file.originalname.split(' ').join('');
    callback(null,  name);
  }
});

const imageFilter = function(req, file, callback){
	if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
		callback(null, true);
	}else{
		callback(null, false);
	}
}

//1 * 1024 * 1024 --> 1MB
const profilUpload = multer({
  storage: optionProfil,
  limits:{ fileSize: 1 * 1024 * 1024},
  fileFilter: imageFilter
});

module.exports = {
  profilUpload
}