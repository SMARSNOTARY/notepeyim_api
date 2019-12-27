'use strict';
module.exports = (sequelize, DataTypes) => {
  const departement = sequelize.define('departement', {
    desc_department: DataTypes.STRING,
    code: DataTypes.STRING
  }, {});
  departement.associate = function(models) {
    // associations can be defined here
    models.departement.hasMany(models.commune);
  };
  return departement;
};