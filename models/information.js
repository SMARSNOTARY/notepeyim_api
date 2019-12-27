'use strict';
module.exports = (sequelize, DataTypes) => {
  const information = sequelize.define('information', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    naissance: DataTypes.DATE,
    nif: DataTypes.STRING,
    addresse: DataTypes.STRING,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    comission: DataTypes.DATE,
    communeID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    isValidate: DataTypes.BOOLEAN
  }, {});
  information.associate = function(models) {
    // associations can be defined here
    models.information.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });

    models.information.belongsTo(models.commune, {
      foreignKey: {
        allowNull: false
      }
    });

  };
  return information;
};