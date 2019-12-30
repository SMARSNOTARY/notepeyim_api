const models = require('../models');
const Type = models.type;

const createType = (values, callback) => {
  Type
    .create(values)
    .then(result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const getType = ({id}, callback) => {
  var opt = {};
  if( id ){ opt.id = id; }

  Type
    .findAll({
      where: opt,
      limit: 100
    })
    .then(results => { callback(null, results); })
    .catch(error => callback(error, null));
}

const updateType = (id, values, callback) => {

  Type
    .update({ values }, {where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const deleteType = (id, callback) => {

  Type
    .destroy({where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

module.exports = {
  createType,
  getType,
  updateType,
  deleteType
}


