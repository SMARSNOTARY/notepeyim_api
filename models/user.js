'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    password: DataTypes.STRING,
    typeID: DataTypes.INTEGER,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    models.user.belongsTo(models.type, {
      foreignKey: {
        allowNull: false
      }
    })

    models.user.hasOne(models.information);

    models.user.hasMany(models.rating, {as: 'clientRate'});
    models.user.hasMany(models.rating, {as: 'notaireRate'});

    models.user.hasMany(models.meeting, {as: 'client'});
    models.user.hasMany(models.meeting, {as: 'notaire'});
  };
  return user;
};