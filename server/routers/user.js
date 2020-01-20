const express = require('express');
const router = express.Router();
const User = require('./../../controllers/user');
const { profilUpload } = require('./../../config/utils');

router.use(function timeLog (req, res, next) {
  console.log('Time user: ', Date.now())
  next();
});

/*
router.post('/', (req, res)=>{

  User.createUser(req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});
*/

router.get('/:id*?', (req, res)=>{
  User.getUser(req.params, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

const upload = profilUpload.single('photo');

router.patch('/', (req, res)=>{
  const decod = req['decoded'];

  upload(req, res, (error) => {
    if(error){
      error.message = error.code == 'LIMIT_FILE_SIZE'? 'File Size is too large. Allowed fil size is 1Mb': error.message;

      res
        .status(200)
        .json({error, result: null})
    }else{

      if(req.file){
        req.body.photo = `/media/${req.file.filename}/?type=profil`;
      }

      User.updateUser(decod.user.id, req.body, (error, result)=> {
        res
        .status(200)
        .json({error, result})
      });

    }
  })
});

router.delete('/', (req, res)=>{
  const decod = req['decoded'];

  User.deleteUser(decod.user.id, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;