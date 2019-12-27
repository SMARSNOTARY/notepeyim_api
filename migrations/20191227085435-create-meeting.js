'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meetings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sujet: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      datemeet: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        default: 'ATTENTE'
      },
      clientID: {
        type: Sequelize.INTEGER,
        references: {model: 'Users', key: 'id'}
      },
      notaireID: {
        type: Sequelize.INTEGER,
        references: {model: 'Users', key: 'id'}
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
    return queryInterface.dropTable('meetings');
  }
};