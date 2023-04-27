const Sequelize = require('sequelize');
const database = require('./AppDb');

const Teacher = database.define('Teacher', {
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
    }
})

module.exports = Teacher;