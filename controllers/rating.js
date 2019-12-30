const models = require('../models');
const Rating = models.rating;
const User = models.user;

const createRating = (values, callback) => {
  Rating
    .create(values)
    .then(result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const getRating = ({id}, callback) => {
  var opt = {};
  if( id ){ opt.id = id; }

  Rating
    .findAll({
      where: opt,
      include: [
        { model: User, required: true, as: 'client'},
        { model: User, required: true, as: 'notaire'}
      ],
      limit: 100
    })
    .then(results => { callback(null, results); })
    .catch(error => callback(error, null));
}

const updateRating = (id, values, callback) => {

  Rating
    .update({ values }, {where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const deleteRating = (id, callback) => {

  Rating
    .destroy({where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

module.exports = {
  createRating,
  getRating,
  updateRating,
  deleteRating
}


