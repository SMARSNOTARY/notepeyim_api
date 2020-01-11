'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    password: {
      type: DataTypes.STRING,
      get: function() {
        return this.getDataValue('password')!== '' ? 'yes':'no';
      }
    },
    hashpassword: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING, ['password']),
      get: function() {
        return this.getDataValue('password');
      }
    },
    typeID: DataTypes.INTEGER,
    telephone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isUnique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: '/img/profil/default.png'
    }
  }, {
    indexes: [{unique: true, fields: ['email']}],
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });

  user.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.hashpassword);
  }

  user.associate = function(models) {
    // associations can be defined here
    models.user.belongsTo(models.type, {
      foreignKey: {
        allowNull: false
      }
    })

    models.user.hasOne(models.information);

    models.user.hasMany(models.rating, {as: 'clientRate'});
    models.user.hasMany(models.rating, {as: 'notaireRate'});

    models.user.hasMany(models.meeting, {as: 'client'});
    models.user.hasMany(models.meeting, {as: 'notaire'});
  };
  return user;
};
