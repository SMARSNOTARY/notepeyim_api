'use strict';
module.exports = (sequelize, DataTypes) => {
  const type = sequelize.define('type', {
    desc_type: DataTypes.STRING
  }, {});
  type.associate = function(models) {
    // associations can be defined here
    models.type.hasMany(models.user);
  };
  return type;
};