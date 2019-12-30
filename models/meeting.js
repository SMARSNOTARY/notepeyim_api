'use strict';
module.exports = (sequelize, DataTypes) => {
  const meeting = sequelize.define('meeting', {
    sujet: DataTypes.STRING,
    content: DataTypes.STRING,
    datemeet: DataTypes.DATE,
    status: DataTypes.STRING,
    userID: DataTypes.INTEGER, 
    notaireID: DataTypes.INTEGER
  }, {});
  meeting.associate = function(models) {
    // associations can be defined here
    models.meeting.belongsTo(models.user, {
      foreignKey: {
        field: 'userId',
        allowNull: false
      },
      as: 'client'
    });

    models.meeting.belongsTo(models.user, {
      foreignKey: {
        field: 'notaireId',
        allowNull: false
      },
      as: 'notaire'
    });

  };
  return meeting;
};