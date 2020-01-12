const express = require('express');
const router = express.Router();
const {auth, authverify} = require('./../../config/auth');
const Commune = require('./../../controllers/commune');

router.use(function timeLog (req, res, next) {
  console.log('Time commune: ', Date.now())
  next();
});

router.post('/', auth, authverify, (req, res)=>{

  Commune.createCommune(req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.get('/:id*?', (req, res)=>{
  Commune.getCommune(req.params, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.patch('/:id', auth, authverify, (req, res)=>{
  Commune.updateCommune(req.params.id, req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
})

router.delete('/:id', auth, authverify, (req, res)=>{
  Commune.deleteCommune(req.params.id, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;