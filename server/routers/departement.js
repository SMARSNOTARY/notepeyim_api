const express = require('express');
const router = express.Router();
const Department = require('./../../controllers/departement');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});

router.post('/', (req, res)=>{
  
  Department.createDepartment(req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.get('/:id*?', (req, res)=>{
  Department.getDepartment(req.params, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.patch('/:id', (req, res)=>{
  Department.updateDepartment(req.params, req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
})

router.delete('/:id', (req, res)=>{
  Department.deleteDepartment(req.params, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;