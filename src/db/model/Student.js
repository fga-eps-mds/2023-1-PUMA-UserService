const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Student = database.define('Student', {
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: {
                tableName: "Common_User",
                schema: "public",
            },
            key: "userId"
        },
    },
    regNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    softSkills: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true
})

module.exports = Student;