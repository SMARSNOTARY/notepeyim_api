const express = require('express');
const router = express.Router();
const Rating = require('./../../controllers/rating');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
});

router.post('/', (req, res)=>{
  Rating.createRating(req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.get('/count/:id', (req, res)=>{
  Rating.countRating(req.params, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.get('/:id*?', (req, res)=>{

  Rating.getRating(req.params, req.query, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

router.patch('/:id', (req, res)=>{
  Rating.updateRating(req.params.id, req.body, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
})

router.delete('/:id', (req, res)=>{
  Rating.deleteRating(req.params.id, (error, result)=> {
    res
    .status(200)
    .json({error, result})
  });
});

module.exports = router;