const models = require('../models');
const User = models.user;
const Type = models.type;
const Information = models.information;

const createUser = (values, callback) => {
  User
    .create(values)
    .then(result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const getUser = ({id}, callback) => {
  var opt = {};
  if( id ){ opt.id = id; }

  User
    .findAll({
      where: opt,
      include: [
        { model: Information, required: false},
        { model: Type, required: true}],
      limit: 100
    })
    .then(results => { callback(null, results); })
    .catch(error => callback(error, null));
}

const updateUser = (id, values, callback) => {

  User
    .update({ values }, {where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const deleteUser = (id, callback) => {

  User
    .destroy({where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser
}