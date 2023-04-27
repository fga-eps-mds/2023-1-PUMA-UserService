const Sequelize = require('sequelize');
const database = require('./AppDb');

const Common_User = database.define('Common_User', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    passwordHash: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
    },
})

module.exports = Common_User