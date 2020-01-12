const express = require('express');
const router = express.Router();
const User = require('./../../controllers/user');

router.use(function timeLog (req, res, next) {
  console.log('Time login: ', Date.now())
  next();
});

router.post('/', (req, res)=>{

  User.getLogin(req.body, (error, result)=> {

    let token = result != null ? req.token : null;

    res
    .status(200)
    .json({error, token, result})
  });
});

router.post('/request/', (req, res)=>{

  User.requestResetPass( req.body.email, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.post('/reset/:id', (req, res)=>{

  User.resetPass( req.params.id, req.body.password, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;