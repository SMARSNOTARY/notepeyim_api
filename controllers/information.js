const models = require('../models');
const Information = models.information;
const User = models.user;

const createInformation = (values, callback) => {
  Information
    .create(values)
    .then(result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const getInformation = ({id}, callback) => {
  var opt = {};
  if( id ){ opt.id = id; }

  Information
    .findAll({
      where: opt,
      include: [{ model: User, required: false}],
      limit: 100
    })
    .then(results => { callback(null, results); })
    .catch(error => callback(error, null));
}

const updateInformation = (id, values, callback) => {

  Information
    .update({ values }, {where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const deleteInformation = (id, callback) => {

  Information
    .destroy({where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

module.exports = {
  createInformation,
  getInformation,
  updateInformation,
  deleteInformation
}


