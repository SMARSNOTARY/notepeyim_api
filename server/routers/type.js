const express = require('express');
const router = express.Router();
const Type = require('./../../controllers/type');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});

router.post('/', (req, res)=>{

  Type.createType(req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.get('/:id*?', (req, res)=>{
  Type.getType(req.params, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.patch('/:id', (req, res)=>{
  Type.updateType(req.params.id, req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
})

router.delete('/:id', (req, res)=>{
  Type.deleteType(req.params.id, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;