const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {

  const bearerHeader = req.headers.authorization;
  if(typeof bearerHeader !== 'undefined'){
    const token = bearerHeader.split(' ')[1];
    req.token = token;
    next();
  }else{
    //res.sendStatus(403)
    res.status(403).json({message: 'access forbidden'});
  }
}

const authsign = (req, res, next) => {

  const token = jwt.sign({
    data: 'Why u need to decode this token'
  }, process.env.SECRET_AUTH, { expiresIn: '150 days' });
  req.token = token;
  next();
}

const authverify = (req, res, next) => {

  jwt.verify(req.token, process.env.SECRET_AUTH, (err, decoded)=> {
    if(err){
      res.status(403).json({message: 'login to get your token'});
    }else{
      req.decoded = decoded;
      next();
    }
  });
}

module.exports = {
  auth,
  authsign,
  authverify
};
