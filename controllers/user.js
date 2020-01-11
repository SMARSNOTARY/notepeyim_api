const models = require('../models');
const User = models.user;
const Type = models.type;
const Information = models.information;
const ResetPass = models.resetpass;

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

const getLogin = (values, callback) => {

  User
    .findOne({
      where: {email: values.email},
      include: [
        { model: Information, required: false},
        { model: Type, required: true}],
      limit: 1
    })
    .then(async (results) => {

      if(await results.validPassword(values.password)){
        callback(null, results);
      }else{
        callback({}, null);
      }
    })
    .catch(error => callback(error, null));
}

const requestResetPass = ( email, callback) => {

  User
    .findOne({
      where: { email },
      limit: 1
    })
    .then(results => {
      ResetPass
      .create({userID: results.id})
      .then(response => {
        let date = new Date(response.createdAt);
        date.setHours(date.getHours() + 24);

        var result = {
          email: results.email,
          telephone: results.telephone,
          expriry: date,
          code: response.id,
          link: `http://127.0.0.1:3000/api/login/reset/${response.id}`
        };
        callback(null, result);
      })
      .catch( error => callback(error, null));
    })
    .catch(error => callback(error, null));
}

const resetPass = (id, password, callback) => {

  ResetPass
    .findOne({
      where: {id},
      limit: 1
    })
    .then(results => {
      let dateNow = new Date();
      let dateExpiry = new Date(results.expiry);
      if( dateNow <= dateExpiry && results.used == 'NO'){
        User
        .update(
          { password },
          { where: { id: results.userID }, individualHooks: true}
        )
        .then( response => {
          console.log('response')
          ResetPass
            .update({used: 'YES'}, {where: {id: results.id}})
            .then( result => { callback(null, {response, result})})
            .catch( error => { callback(error, null)})
        })
        .catch( error => { callback(error, null) });
      }else{
        let error = {
          message: 'Please request a new value, your old request target the actual date or already use',
          old:{
            expiry: dateExpiry,
            createdAt: results.createdAt
          }
        }

        callback(error, null)
      }
    })
    .catch(error => callback(error, null));
}

const updateUser = (id, values, callback) => {
  delete values.password;

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
  getLogin,
  requestResetPass,
  resetPass,
  updateUser,
  deleteUser
}