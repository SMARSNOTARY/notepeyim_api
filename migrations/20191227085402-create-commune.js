'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('communes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desc_commune: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      deptID: {
        type: Sequelize.INTEGER,
        references: {model: 'Departements', key: 'id'}
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        default: '/img/commune/default.jpg'
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
    return queryInterface.dropTable('communes');
  }
};