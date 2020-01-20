const express = require('express');
const router = express.Router();
const User = require('./../../controllers/user');
const { authsign } = require('./../../config/auth');

router.use(function timeLog (req, res, next) {
  console.log('Time login: ', Date.now())
  next();
});

router.post('/', (req, res, next)=>{

  User.getLogin(req.body, (error, result)=> {
    req['api'] = {};
    req['api']['error'] = error;
    req['api']['result'] = result;
    next();
  });
}, authsign);

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

/*
Publishable key -> pk_test_pISb2Oa5ruD40gLYMXwy5CU7

Secret key -> sk_test_DufAALPfasIZBCq3Za4u8mUB
*/