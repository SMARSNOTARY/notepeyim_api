const express = require('express');
const router = express.Router();
const User = require('./../../controllers/user');

router.use(function timeLog (req, res, next) {
  console.log('Time register: ', Date.now())
  next();
});

router.post('/', (req, res)=>{

  User.createUser(req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;