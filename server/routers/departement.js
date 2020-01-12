const express = require('express');
const router = express.Router();
const {auth, authverify} = require('./../../config/auth');
const Department = require('./../../controllers/departement');

router.use(function timeLog (req, res, next) {
  console.log('Time departement: ', Date.now())
  next();
});

router.post('/', auth, authverify, (req, res)=>{

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

router.patch('/:id', auth, authverify, (req, res)=>{
  Department.updateDepartment(req.params.id, req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
})

router.delete('/:id', auth, authverify, (req, res)=>{
  Department.deleteDepartment(req.params.id, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;