const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Contact = database.define('Contact', {
    contactId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    freezeTableName: true
})

module.exports = Contact;