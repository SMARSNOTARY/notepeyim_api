'use strict';
module.exports = (sequelize, DataTypes) => {
  const commune = sequelize.define('commune', {
    desc_commune: DataTypes.STRING,
    departementId: DataTypes.INTEGER,
    code: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  commune.associate = function(models) {
    // associations can be defined here
    models.commune.hasMany(models.information);
    models.commune.belongsTo(models.departement, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return commune;
};