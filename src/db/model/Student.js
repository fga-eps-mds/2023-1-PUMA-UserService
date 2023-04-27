const Sequelize = require('sequelize');
const database = require('./AppDb');

const Student = database.define('Student', {
    email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    softSkills: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = Student;