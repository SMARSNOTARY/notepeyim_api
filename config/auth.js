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

  const error = req.api.error;
  const result = req.api.result;
  const id = result != null ? result.id : null;

  let token = jwt.sign({
    data: 'Why u need to decode this token',
    user: { id }
  }, process.env.SECRET_AUTH, { expiresIn: '150 days' });
  req.token = token;

  token = result != null ? token : null;

  res
    .status(200)
    .json({error, token, result})
}

const authverify = (req, res, next) => {

  jwt.verify(req.token, process.env.SECRET_AUTH, (err, decoded)=> {
    if(err){
      res.status(403).json({message: 'Invalid token, login to get your token'});
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
