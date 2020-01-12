const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.use(function timeLog (req, res, next) {
  console.log('Time file: ', Date.now())
  next();
});

router.get('/:name', (req, res)=>{

  const type = req.query.type ? req.query.type : 'profil';

  const pathImg = path.join(__dirname, `./../../files/${type}/`, req.params.name);

  const pathDefault = path.join(__dirname, `./../../files/${type}/default.png`);

  const file = fs.existsSync(pathImg) ? pathImg : pathDefault;

  res
    .status(200)
    .sendFile(file);
});

module.exports = router;