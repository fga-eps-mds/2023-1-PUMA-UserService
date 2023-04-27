const Sequelize = require('sequelize');
const database = require('./AppDb');

const Physical_Agent = database.define('Physical_Agent', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: {
                tableName: "Common_User",
                schema: "public",
            },
            key: "email"
        },
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Physical_Agent