'use strict';
module.exports = (sequelize, DataTypes) => {
  const resetpass = sequelize.define('resetpass', {
    userID: DataTypes.INTEGER,
    used: {
      type: DataTypes.STRING(10),
      defaultValue: 'NO',
      allowNull: false
    },
    expiry: {
      type: new DataTypes.VIRTUAL(DataTypes.DATE, ['createdAt']),
      get: function() {
        let created = this.getDataValue('createdAt');
        let date = new Date( created );
        date.setHours(date.getHours() + 24);
        return date;
      }
    }
  }, {

  });
  resetpass.associate = function(models) {
    // associations can be defined here
  };
  return resetpass;
};