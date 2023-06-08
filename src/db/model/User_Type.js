const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const User_Type = database.define('User_Type', {
    userTypeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    typeName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
})

module.exports = User_Type