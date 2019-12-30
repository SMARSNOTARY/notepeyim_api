const express = require('express');
const router = express.Router();
const Meeting = require('./../../controllers/meeting');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});

router.post('/', (req, res)=>{
  Meeting.createMeeting(req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.get('/:id*?', (req, res)=>{
  Meeting.getMeeting(req.params, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.patch('/:id', (req, res)=>{
  Meeting.updateMeeting(req.params.id, req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
})

router.delete('/:id', (req, res)=>{
  Meeting.deleteMeeting(req.params.id, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;