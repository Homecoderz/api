const Sequelize = require('sequelize');

module.exports = sequelize.define('Ecole', {
    ecoleId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    ecoleNom: {
        type: Sequelize.STRING(30),
        allowNull: false,
    }, 
    ecoleCode: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    anneeScolaire: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
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
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})
