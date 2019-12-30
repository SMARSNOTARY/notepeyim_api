'use strict';
module.exports = (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
    value: DataTypes.DOUBLE,
    notaireID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {});
  rating.associate = function(models) {
    // associations can be defined here

    models.rating.belongsTo(models.user, {
      foreignKey: {
        field: 'userId',
        allowNull: false
      },
      as: 'client'
    });

    models.rating.belongsTo(models.user, {
      foreignKey: {
        field: 'notaireId',
        allowNull: false
      },
      as: 'notaire'
    });

  };
  return rating;
};