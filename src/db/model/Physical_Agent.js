const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Physical_Agent = database.define('Physical_Agent', {
    email: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = Physical_Agent