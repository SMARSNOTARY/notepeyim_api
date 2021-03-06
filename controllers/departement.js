const models = require('../models');
const Departement = models.departement;

const createDepartment = (values, callback) => {
  Departement
    .create(values)
    .then( result => { callback(null, result ); })
    .catch( error => callback(error, null));
}

const getDepartment = ({id}, callback) => {
  var opt = {};
  if( id ){ opt.id = id; }

  Departement
    .findAll({where: opt})
    .then(results => { callback(null, results); })
    .catch(error => callback(error, null));
}

const updateDepartment = (id, values, callback) => {

  Departement
    .update( values, {where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const deleteDepartment = (id, callback) => {

  Departement
    .destroy({where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

module.exports = {
  createDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment
}


