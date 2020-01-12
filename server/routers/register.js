const express = require('express');
const router = express.Router();
const User = require('./../../controllers/user');
const { profilUpload } = require('./../../config/utils');

router.use(function timeLog (req, res, next) {
  console.log('Time register: ', Date.now())
  next();
});

const upload = profilUpload.single('photo');

router.post('/', (req, res)=>{
  upload(req, res, (error) => {
    if(error){
      error.message = error.code == 'LIMIT_FILE_SIZE'? 'File Size is too large. Allowed fil size is 1Mb': error.message;
      
      res
        .status(200)
        .json({error, token: null, result: null})
    }else{
      const profil = req.file ? `/media/${req.file.filename}/?type=profil` : '/media/default.png/?type=profil';
      req.body.photo = profil;

      User.createUser(req.body, (error, result)=> {

        let token = result != null ? req.token : null;
        res
        .status(200)
        .json({error, token, result})
      });
    }
  })
});

module.exports = router;