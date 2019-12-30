const express = require('express');
const router = express.Router();
const Information = require('./../../controllers/information');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});

router.post('/', (req, res)=>{

  Information.createInformation(req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.get('/:id*?', (req, res)=>{
  Information.getInformation(req.params, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.patch('/:id', (req, res)=>{
  Information.updateInformation(req.params.id, req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
})

router.delete('/:id', (req, res)=>{
  Information.deleteInformation(req.params.id, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;