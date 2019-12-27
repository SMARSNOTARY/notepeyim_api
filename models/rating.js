'use strict';
module.exports = (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
    value: DataTypes.DOUBLE,
    notaireID: DataTypes.INTEGER,
    clientID: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  rating.associate = function(models) {
    // associations can be defined here
    models.rating.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return rating;
};