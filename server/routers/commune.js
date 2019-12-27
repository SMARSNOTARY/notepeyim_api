const express = require('express');
const router = express.Router();
const Commune = require('./../../controllers/commune');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});

router.post('/', (req, res)=>{

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

router.patch('/:id', (req, res)=>{
  Commune.updateCommune(req.params, req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
})

router.delete('/:id', (req, res)=>{
  Commune.deleteCommune(req.params, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;