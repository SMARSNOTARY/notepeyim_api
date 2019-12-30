const models = require('../models');
const Meeting = models.meeting;
const User = models.user;

const createMeeting = (values, callback) => {
  Meeting
    .create(values)
    .then(result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const getMeeting = ({id}, callback) => {
  var opt = {};
  if( id ){ opt.id = id; }

  Meeting
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
/*

*/
const updateMeeting = (id, values, callback) => {

  Meeting
    .update({ values }, {where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

const deleteMeeting = (id, callback) => {

  Meeting
    .destroy({where: { id }})
    .then( result => { callback(null, result); })
    .catch( error => callback(error, null));
}

module.exports = {
  createMeeting,
  getMeeting,
  updateMeeting,
  deleteMeeting
}


