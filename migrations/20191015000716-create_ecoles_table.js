'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ecoles', {
      ecoleId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ecoleNom: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true
      }, 
      ecoleCode: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: true
      },
      anneeScolaire: {
          type: Sequelize.STRING(10),
          allowNull: false
      },
      ecoleInspection: {
          type: Sequelize.STRING(20),
          allowNull: false
      },
      ecoleDren: {
          type: Sequelize.STRING(20),
          allowNull: false
      },
      iepLogo: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }) 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ecoles');
  }
};
