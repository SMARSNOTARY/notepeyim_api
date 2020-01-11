const models = require('../models');
const User = models.user;
const Information = models.information;
const Type = models.type;


const createRegister = (values, callback) => {
  //result => { callback(null, result); }
//callback(null, result);
  User
    .create(values)
    .then( (user) => {
      Information
        .create(values)
        .then((info) => {
          callback(null, {user, info});
        })
        .catch(error => callback(error, null))
    })
    .catch( error => callback(error, null));
}


module.exports = {
  createRegister
}