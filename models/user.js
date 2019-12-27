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

    models.user.hasMany(models.rating);
    models.user.hasMany(models.information);
    models.user.hasMany(models.meeting);
  };
  return user;
};