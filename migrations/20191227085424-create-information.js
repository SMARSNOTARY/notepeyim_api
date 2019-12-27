'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('information', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      naissance: {
        type: Sequelize.DATE,
        allowNull: false
      },
      nif: {
        type: Sequelize.STRING,
        allowNull: true
      },
      addresse: {
        type: Sequelize.STRING,
        allowNull: true
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      comission: {
        type: Sequelize.DATE,
        allowNull: true
      },
      communeID: {
        type: Sequelize.INTEGER,
        references: {model: 'Communes', key: 'id'}
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {model: 'Users', key: 'id'}
      },
      isValidate: {
        type: Sequelize.BOOLEAN,
        default: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('information');
  }
};