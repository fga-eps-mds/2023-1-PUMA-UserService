const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Common_User = database.define('Common_User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true
})

module.exports = Common_User