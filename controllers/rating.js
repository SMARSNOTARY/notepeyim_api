const models = require('../models');
const Rating = models.rating;
const User = models.user;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const createRating = (values, callback) => {
  Rating
    .create(values)
    .then(result => { callback(null, result); })
    .catch( error => callback(error, null));
}
// next prev
const getRating = ({id}, query, callback) => {

  const next = query.hasOwnProperty('next') ? {[Op.lte]: query.next} : {};
  const prev = query.hasOwnProperty('prev') ? {[Op.gte]: query.prev} : {};
  const pagination = next != {} ? next : prev != {} ? prev : {};

  var opt = {};
  if( id ){ opt.id = id; }
/*
[Op.or]: [
        { id: pagination },
        { id: id }
      ]
*/
  Rating
    .findAll({
      where: opt,
      order: [['id', 'DESC']],
      include: [
        { model: User, required: true, as: 'client'},
        { model: User, required: true, as: 'notaire'}
      ],
      limit: 100
    })
    .then(results => { callback(null, results); })
    .catch(error => callback(error, null));
}

const countRating = ({id}, callback) => {
  var opt = {};
  if( id ){ opt.notaireId = id; }

  Rating
    .findAndCountAll({
      where: opt
    })
    .then(results => {

      const sumCalculate = results.rows.reduce((sum, current)=> {
        return sum + current.value;
      }, 0);

      results.sum = sumCalculate;
      callback(null, results);
    })
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
  countRating,
  deleteRating
}


