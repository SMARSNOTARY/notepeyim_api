'use strict';
module.exports = (sequelize, DataTypes) => {
  const meeting = sequelize.define('meeting', {
    sujet: DataTypes.STRING,
    content: DataTypes.STRING,
    datemeet: DataTypes.DATE,
    status: DataTypes.STRING,
    clientID: DataTypes.INTEGER,
    notaireID: DataTypes.INTEGER
  }, {});
  meeting.associate = function(models) {
    // associations can be defined here
    models.meeting.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return meeting;
};