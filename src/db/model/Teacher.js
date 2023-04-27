const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Teacher = database.define('Teacher', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
            model: {
                tableName: "Common_User",
                schema: "public",
            },
            key: "email"
        },
    },
    regNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, {
    freezeTableName: true
})

module.exports = Teacher;