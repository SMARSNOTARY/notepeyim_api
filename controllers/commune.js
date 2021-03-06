const models = require('../models');
const Commune = models.commune;
const Departement = models.departement;

const createCommune = (values, callback) => {
  Commune
    .create(values)
    .then(result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const getCommune = ({id}, callback) => {
  var opt = {};
  if( id ){ opt.id = id; }

  Commune
    .findAll({
      where: opt,
      include: [{ model: Departement, required: true}],
      limit: 100
    })
    .then(results => { callback(null, results); })
    .catch(error => callback(error, null));
}

const updateCommune = (id, values, callback) => {

  Commune
    .update({ values }, {where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const deleteCommune = (id, callback) => {

  Commune
    .destroy({where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

module.exports = {
  createCommune,
  getCommune,
  updateCommune,
  deleteCommune
}


