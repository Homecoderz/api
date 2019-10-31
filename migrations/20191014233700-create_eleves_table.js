'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eleves', {
      eleveId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      prenoms: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      dateNaissance: {
        type: Sequelize.DATE,
        allowNull: false
      },
      lieuNaissance: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      genre: {
        type: Sequelize.CHAR,
        allowNull: false
      },
      niveau: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      matricule: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
      },
      contact: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      ecoleId: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('eleves');
  }
};